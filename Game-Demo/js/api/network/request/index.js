import view from './view';
import { request, onHeadersReceived, offHeadersReceived } from '../apiList';
module.exports = function(PIXI, app, obj) {
    var requestIsAbort = false;
    return view(PIXI, app, obj, (res) => {
        let { status, drawFn } = res;

        switch(status) {
            case 'request':
                let time = Date.now();
                request(res => {
                    wx.reportPerformance && wx.reportPerformance(1001, Date.now() - time); // 上报请求总时间的耗时

                    drawFn(res, time); //绘制信息
                }, requestIsAbort);
                break;
            case 'abort':
                requestIsAbort = true;
                drawFn?.();
                break;
            case 'abort1':
                requestIsAbort = false;
                drawFn?.();
                break;
            case 'onHeadersReceived':
                onHeadersReceived();
                drawFn?.();
                break;
            case 'offHeadersReceived':
                offHeadersReceived();
                drawFn?.();
                break;

        }
    });
};
