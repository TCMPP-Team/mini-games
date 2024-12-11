import view from './view';
import * as show from '../../../libs/show';
module.exports = function(PIXI, app, obj) {
    return view(PIXI, app, obj, data => {
        let { status, dirPath, drawFn } = data;
        dirPath = `${wx.env.USER_DATA_PATH}/fileA`;
        switch (status) {
            case 'readdir':
                // 先获取全局唯一的文件管理器，接着调起readdir方法
                wx.getFileSystemManager().readdir({
                    dirPath,
                    success(res) {
                        if (!(res.files || []).length) return show.Modal('目录内容为空', '异步读取目录成功');

                        show.Toast('异步读取目录成功', 'success', 800);

                        drawFn(dirPath); // 更新UI
                    },
                    fail(res) {
                        if (!res.errMsg) return;

                        if (
                            res.errMsg.includes('no such file or directory') ||
                            res.errMsg.includes('fail not a directory')
                        ) {
                            res.errMsg = `目录 ${JSON.stringify(dirPath)} 不存在，请去创建`;

                            show.Modal(res.errMsg, '异步读取目录发生错误');
                        }
                    }
                });
                break;
            case 'readdirSync':
                try {
                    const files = wx.getFileSystemManager().readdirSync(dirPath);

                    if (!(files || []).length) return show.Modal('目录内容为空', '同步读取目录成功');

                    show.Toast('同步读取目录成功', 'success', 800);

                    drawFn(dirPath); // 更新UI
                } catch (err) {
                    show.Modal(err.toString(), '同步读取目录发生错误');
                }
                break;
        }
    });
};
