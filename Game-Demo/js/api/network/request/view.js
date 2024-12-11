import { p_button, p_text } from '../../../libs/component/index';
import fixedTemplate from '../../../libs/template/fixed';
import { switchButtonState } from '../../../libs/util';
var requestIsAbort;

module.exports = function(PIXI, app, obj, callBack) {
    let container = new PIXI.Container(),
        { goBack, title, api_name, underline, logo, logoName } = fixedTemplate(PIXI, {
            obj,
            title: '发送请求',
            api_name: 'request'
        }),
        explain = p_text(PIXI, {
            content: '点击向服务器发起请求',
            fontSize: 30 * PIXI.ratio,
            fill: 0x999999,
            y: underline.y + underline.height + 100 * PIXI.ratio,
            relative_middle: { containerWidth: obj.width }
        }),
        button = p_button(PIXI, {
            y: explain.y + explain.height + 100 * PIXI.ratio
        });


    button.myAddChildFn(
        p_text(PIXI, {
            content: 'request',
            fontSize: 30 * PIXI.ratio,
            fill: 0xffffff,
            relative_middle: { containerWidth: button.width, containerHeight: button.height }
        })
    );

    button.onClickFn(() => {
        callBack({
            status: 'request',
            drawFn(res, time) {
                explain.turnText(`数据包大小(buffer长度)：${res.data.byteLength || 0}\n请求耗时：${Date.now() - time}ms`);
            }
        })
    });

    // 开启中断请求‘按钮’开始
    let abortButton = p_button(PIXI, {
        y: button.y + button.height + 20 * PIXI.ratio,
        border: {
            width: 2 * PIXI.ratio,
            color: 0x353535
        },
        alpha: 0,
    });

    abortButton.myAddChildFn(p_text(PIXI, {
        content: '开启中断请求',
        fontSize: 30 * PIXI.ratio,
        fill: 0x353535,
        relative_middle: { containerWidth: button.width, containerHeight: button.height }
    }));
    abortButton.onClickFn(() => {
        callBack({
            status: 'abort',
            drawFn(res) {
                explain.turnText(`中断请求已开启，请重新发起请求`);
            }
        });

        switchButtonState([{
            button: abortButton, 
            boolead: false, 
            color: 0xe9e9e9
        }, {
            button: abortButton1, 
            boolead: true, 
            color: 0x353535
        }]);
    });
    // 开启中断请求‘按钮’结束
     
    // 关闭中断请求‘按钮’开始
    let abortButton1 = p_button(PIXI, {
        y: abortButton.y + abortButton.height + 20 * PIXI.ratio,
        border: {
            width: 2 * PIXI.ratio,
            color: 0xe9e9e9
        },
        alpha: 0,
    });

    abortButton1.myAddChildFn(p_text(PIXI, {
        content: '关闭中断请求',
        fontSize: 30 * PIXI.ratio,
        fill: 0xe9e9e9,
        relative_middle: { containerWidth: abortButton.width, containerHeight: abortButton.height }
    }));
    
    abortButton1.onClickFn(() => {
        
        switchButtonState([{
            button: abortButton, 
            boolead: true, 
            color: 0x353535
        }, {
            button: abortButton1, 
            boolead: false, 
            color: 0xe9e9e9
        }]);
        callBack({
            status: 'abort1',
            drawFn(res) {
                explain.turnText(`中断请求已关闭`);
            }
        });
    });
    abortButton1.isTouchable(false);
    // 关闭中断请求‘按钮’结束

    // 开启headersReceived监听‘按钮’开始
    let onHeadersReceivedButton = p_button(PIXI, {
        y: abortButton1.y + abortButton1.height + 20 * PIXI.ratio,
        border: {
            width: 2 * PIXI.ratio,
            color: 0x353535
        },
        alpha: 0,
    });

    onHeadersReceivedButton.myAddChildFn(p_text(PIXI, {
        content: '开启headersReceived监听',
        fontSize: 30 * PIXI.ratio,
        fill: 0x353535,
        relative_middle: { containerWidth: abortButton1.width, containerHeight: abortButton1.height }
    }));
    onHeadersReceivedButton.onClickFn(() => {
        callBack({
            status: 'onHeadersReceived',
            drawFn(res) {
                explain.turnText(`headersReceived监听已开启，请重新发起请求`);
            }
        });

        switchButtonState([{
            button: onHeadersReceivedButton, 
            boolead: false, 
            color: 0xe9e9e9
        }, {
            button: offHeadersReceivedButton, 
            boolead: true, 
            color: 0x353535
        }]);
    });
    // 开启headersReceived监听‘按钮’结束

    // 关闭headersReceived监听‘按钮’开始
    let offHeadersReceivedButton = p_button(PIXI, {
        y: onHeadersReceivedButton.y + onHeadersReceivedButton.height + 20 * PIXI.ratio,
        border: {
            width: 2 * PIXI.ratio,
            color: 0xe9e9e9
        },
        alpha: 0,
    });

    offHeadersReceivedButton.myAddChildFn(p_text(PIXI, {
        content: '关闭headersReceived监听',
        fontSize: 30 * PIXI.ratio,
        fill: 0xe9e9e9,
        relative_middle: { containerWidth: onHeadersReceivedButton.width, containerHeight: onHeadersReceivedButton.height }
    }));
    offHeadersReceivedButton.onClickFn(() => {
        callBack({
            status: 'offHeadersReceived',
            drawFn(res) {
                explain.turnText(`headersReceived监听已关闭，请重新发起请求`);
            }
        });

        switchButtonState([{
            button: onHeadersReceivedButton, 
            boolead: true, 
            color: 0x353535
        }, {
            button: offHeadersReceivedButton, 
            boolead: false, 
            color: 0xe9e9e9
        }]);
    });
    offHeadersReceivedButton.isTouchable(false);
    // 关闭headersReceived监听‘按钮’结束

    container.addChild(goBack, title, api_name, underline, explain, abortButton, abortButton1, onHeadersReceivedButton, offHeadersReceivedButton,button, logo, logoName);
    app.stage.addChild(container);

    return container;
};
