import view from './view';
import * as show from '../../../libs/show';
module.exports = function(PIXI, app, obj) {
    return view(PIXI, app, obj, data => {
        let { status, index, path } = data;
        path = [`${wx.env.USER_DATA_PATH}/fileA`, `${wx.env.USER_DATA_PATH}/fileA/test.txt`][index];
        const fileSystemManager = wx.getFileSystemManager();

        switch (status) {
            case 'access':
                // 先获取全局唯一的文件管理器，接着调起access方法
                fileSystemManager.access({
                    path,
                    success() {
                        wx.showModal({
                            content: path + ' 目录存在',
                            showCancel: false,
                            confirmColor: '#02BB00',
                            title: `access success`
                        });
                    },
                    fail(res) {
                        if (!res.errMsg) return;
                        
                        let err = res.errMsg.split(',');
                        err[0] = '文件/目录不存在';
                        show.Modal(err.join(','));
                    }
                });
                break;
            case 'accessSync':
                try {
                    fileSystemManager.accessSync(path);
                    wx.showModal({
                        content: path + ' 目录存在',
                        showCancel: false,
                        confirmColor: '#02BB00',
                        title: `accessSync success`
                    });
                } catch(err) {
                    show.Modal('accessSync fail: 文件/目录不存在', err.toString());
                }
                break;
        }
    });
};
