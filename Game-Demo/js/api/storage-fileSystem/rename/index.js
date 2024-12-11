import view from './view';
import * as show from '../../../libs/show';
module.exports = function(PIXI, app, obj) {
    return view(PIXI, app, obj, data => {
        let { status, pathArr, drawFn } = data;
        switch (status) {
            case 'rename':
                // 先获取全局唯一的文件管理器，接着调起rename方法
                wx.getFileSystemManager().rename({
                    oldPath: pathArr[0],
                    newPath: pathArr[1],
                    success() {
                        show.Toast('异步重命名文件成功', 'success', 800);

                        drawFn(); // 更新UI
                    },
                    fail(res) {
                        if (!res.errMsg) return;

                        if (res.errMsg.includes('fail no such file or directory')) {
                            res.errMsg = `源文件，或目录 ${JSON.stringify(
                                `${wx.env.USER_DATA_PATH}/fileA`
                            )} 不存在，请去创建`;

                            show.Modal(res.errMsg, '异步重命名文件发生错误');
                        }
                    }
                });
                break;
            case 'renameSync':
                    try {
                        wx.getFileSystemManager().renameSync(pathArr[0], pathArr[1]);
                        show.Toast('同步重命名文件成功', 'success', 800);

                        drawFn(); // 更新UI
                    } catch(err) {
                        show.Modal(err?.toString(), '同步重命名文件发生错误');
                    }
                   
                    break;
        }
    });
};
