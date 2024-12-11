import view from './view';
module.exports = function(PIXI, app, obj) {
    return view(PIXI, app, obj, data => {
        let { status } = data;
        switch (status) {
            case 'toast1Tap':
                //触发弹出默认toast
                wx.showToast({
                    title: '默认'
                });
                break;
            case 'toast10Tap':
                //触发弹出默认toast
                wx.showToast({
                    title: '设置Image的toast',
                    image: 'images/logo.png',
                    mask: true,
                    duration: 3000,
                    success: res => {
                        console.log('show custom toast success', res);
                    },
                    fail: err => {
                        console.log('show custom toast fail', err);
                    },
                    complete: result => {
                        console.log('show custom toast complete', result);
                    }
                });
                break;

            case 'toast2Tap':
                //触发弹出设置duration的toast
                wx.showToast({
                    title: 'duration 3000',
                    duration: 3000
                });
                break;

            case 'toast3Tap':
                //触发弹出显示loading的toast
                wx.showToast({
                    title: 'loading',
                    icon: 'loading',
                    duration: 5000
                });
                break;

            case 'hideToast':
                //触发隐藏toast
                wx.hideToast();
                break;
        }
    });
};
