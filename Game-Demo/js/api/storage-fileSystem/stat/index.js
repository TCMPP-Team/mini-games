import view from './view';
import * as show from '../../../libs/show';
module.exports = function(PIXI, app, obj) {
    return view(PIXI, app, obj, data => {
        let { status, index } = data;
        switch (status) {
            case 'stat':
                // 先获取全局唯一的文件管理器，接着调起stat方法
                wx.getFileSystemManager().stat({
                    path: [`${wx.env.USER_DATA_PATH}`, `${wx.env.USER_DATA_PATH}/fileA/hello.txt`][index],
                    success(res) {
                        // 获得文件 Stats 对象
                        let stats = res.stats;

                        // 调用 stats.isDirectory() 方法进行判断
                        show.Toast(`stat:ok 是一个${stats.isDirectory() ? '目录' : '文件'}`, 'success', 800);
                    },
                    fail(res) {
                        if (!res.errMsg) return;

                        if (res.errMsg.includes('no such file or directory')) {
                            res.errMsg = `源文件，或上级目录 ${JSON.stringify(
                                `${wx.env.USER_DATA_PATH}/fileA`
                            )} 不存在，请去创建`;

                            show.Modal(res.errMsg, '异步判断发生错误');
                        }
                    }
                });
                break;
            case 'statSync':
                try {
                    const stats = wx.getFileSystemManager().statSync([`${wx.env.USER_DATA_PATH}`, `${wx.env.USER_DATA_PATH}/fileA/hello.txt`][index]);
                    show.Toast(`statSync:ok 是一个${stats.isDirectory() ? '目录' : '文件'}`, 'success', 800);
                } catch(err) {
                    show.Modal(err.toString(), '同步判断发生错误');
                }
                break;
        }
    });
};
