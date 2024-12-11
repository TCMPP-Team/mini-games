import view from './view';
module.exports = function(PIXI, app, obj) {
    return view(PIXI, app, obj, res => {
        let { status, drawFn, font } = res;
        switch (status) {
            case 'loadFont':
                // 加载自定义字体文件
                font = wx.loadFont(`TencentSans-W7.subset.ttf`);
                console.log('====font', font);

               const aaa = wx.getTextLineHeight({
                  fontFamily: 'TencentSans W7',
                  fontStyle: 'normal',
                  fontSize: 24,
                  fontWeight: 'normal',
                  // text: 'Hello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello Worldello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello Worl',
                  text: 'Hello World',
                  success: res => {
                    console.log('success', res);
                  },
                  fail: err => {
                    console.log('fail', err);
                  },
                  complete(res) {
                    console.log('complete', res)
                  }
                });
                const bbb = wx.getTextLineHeight({
                  fontFamily: 'TencentSans W7',
                  fontStyle: 'italic',
                  fontSize: 24,
                  fontWeight: 'normal',
                  // text: 'Hello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello Worldello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello Worl',
                  text: 'Hello World',
                  success: res => {
                    console.log('success', res);
                  },
                  fail: err => {
                    console.log('fail', err);
                  },
                  complete(res) {
                    console.log('complete', res)
                  }
                });
                console.log('=====textHeight', aaa, bbb);
                setTimeout(() => {
                  drawFn(font); // 更新UI
                }, 500);

                break;
        }
    });
};
