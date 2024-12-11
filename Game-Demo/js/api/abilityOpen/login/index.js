import view from './view';
module.exports = function(PIXI, app, obj) {
    return view(PIXI, app, obj, data => {
        let { status, drawFn } = data;
        switch (status) {
            case 'login':
                // 登录
                wx.login({
                    success(res) {
                        console.log('wx.login res', res);
                        if (res.code) {
                            // 发起网络请求
                            drawFn();
                        } else {
                            console.log('登录失败！' + res.errMsg);
                        }
                    },
                    fail: err => {
                      wx.showModal({
                        title: 'login failed',
                        content: JSON.stringify(err),
                        complete: (res) => {
                         
                        }
                      })
                      console.log('login fail', err);
                    },
                    complete: result => {
                      console.log('login complete', result);
                    }
                });
                break;
        }
    });
};
