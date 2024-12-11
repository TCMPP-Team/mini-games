import view from './view';
import * as show from '../../../libs/show';
module.exports = function(PIXI, app, obj) {
    return view(PIXI, app, obj, data => {
        let { status, key, value } = data;
        switch (status) {
            case 'setStorage':
                wx.setStorage({
                    key,
                    data: value,
                    success() {
                        show.Modal(`数据异步存储成功`);
                    }
                });
                break;
            case 'setStorageSync':
                try {
                    wx.setStorageSync(key, value);
                    show.Modal(`数据同步存储成功`);
                } catch(err) {
                    console.log(err);
                    show.Modal(`数据同步存储失败`);
                }
                break;
                
            case 'getStorage':
                wx.getStorage({
                    key,
                    success(res) {
                        show.Modal(`data: ${res.data}`, '异步读取数据成功');
                    },
                    fail() {
                        show.Modal('找不到 key 对应的数据', '异步读取数据失败');
                    }
                });
                break;
            case 'getStorageSync':
                try {
                    const res = wx.getStorageSync(key);

                    if(res) {
                        show.Modal(`data: ${res}`, '同步读取数据成功');
                    } else {
                        show.Modal('找不到 key 对应的数据');
                    }
                    
                } catch(err) {
                    console.log(err);
                    show.Modal('找不到 key 对应的数据', '同步读取数据失败');
                }
                break;

            case 'clearStorage':
                wx.clearStorage({
                    success() {
                        show.Modal('清除数据成功');
                    }
                });
                break;

            case 'removeStorage':
                wx.removeStorage({
                    key,
                    success() {
                        show.Modal(`异步清除数据key: ${key}成功`);
                    }
                });
                break;

            case 'removeStorageSync':
                try {
                    wx.removeStorageSync(key);
                    show.Modal(`同步清除数据key: ${key}成功`);
                } catch(err) {
                    console.log(err);
                    show.Modal(`同步清除数据key: ${key}失败`);
                }
                
                break;
        }
    });
};
