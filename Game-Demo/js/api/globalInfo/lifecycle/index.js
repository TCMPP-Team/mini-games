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
        let { status, key, value } = data;
        switch (status) {
            case 'onShow':
                wx.onShow(onShowListener);
                show.Modal('onShow监听成功');
                break;
            case 'offShow':
                wx.offShow(onShowListener);
                show.Modal('移除onShow监听成功');
                break;
            case 'onHide':
                wx.onHide(onHideListener);
                show.Modal('onHide监听成功');
                break;
            case 'offHide':
                wx.offHide(onHideListener);
                show.Modal('移除onHide监听成功');
                break;
        }
    });
};
