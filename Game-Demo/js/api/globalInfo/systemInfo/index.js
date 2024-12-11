import view from './view';
import * as show from '../../../libs/show';
module.exports = function(PIXI, app, obj) {
    const onShowListener = () => {
        show.Modal(`监听到onShow`);
    }
    const onHideListener = () => {
        show.Modal(`监听到onHide`);
    }
    return view(PIXI, app, obj, data => {
        let { status, cb } = data;
        switch (status) {
            case 'getSystemInfo':
                wx.getSystemInfo({
                    success: (res) => {
                        show.Modal('异步获取系统信息成功');
                        cb?.(res);
                    }
                })
                break;
            case 'getSystemInfoSync':
                try {
                    const res = wx.getSystemInfoSync();
                    cb?.(res);
                    show.Modal('同步获取系统信息成功');
                } catch(err) {
                    console.log(err);
                    show.Modal('同步获取系统信息失败')
                }
                break;
        }
    });
};
