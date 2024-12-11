import view from './view';
import * as show from '../../../libs/show';
module.exports = function(PIXI, app, obj) {
    return view(PIXI, app, obj, data => {
        let { status, cb } = data;
        switch (status) {
            case 'getStorageInfo':
                wx.getStorageInfo({
                    success(res) {
                        const { keys, currentSize, limitSize} = res;
                        cb?.(res);
                        show.Modal('异步读取缓存信息成功');
                    },
                    fail() {
                        show.Modal('异步读取缓存信息失败');
                    }
                });
                break;
            case 'getStorageInfoSync':
                try {
                    const res = wx.getStorageInfoSync();
                    cb?.(res);
                    show.Modal('同步读取缓存信息成功');
                    
                } catch(err) {
                    console.log(err);
                    show.Modal('同步读取缓存信息失败');
                }
                break;
        }
    });
};
