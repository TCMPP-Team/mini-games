import { p_button, p_text, p_img, p_box, p_circle } from '../../../libs/component/index';
import fixedTemplate from '../../../libs/template/fixed';
import { switchButtonState } from '../../../libs/util';

module.exports = function(PIXI, app, obj, callBack) {
    let container = new PIXI.Container(),
        { goBack, title, api_name, underline, logo, logoName } = fixedTemplate(PIXI, {
            obj,
            title: '下载文件',
            api_name: 'downloadFile'
        }),
        explain = p_text(PIXI, {
            content: '点击按钮下载服务端实例图片',
            fontSize: 30 * PIXI.ratio,
            fill: 0x999999,
            y: underline.y + underline.height + 300 * PIXI.ratio,
            relative_middle: { containerWidth: obj.width }
        }),
        button = p_button(PIXI, {
            y: explain.y + explain.height + 300 * PIXI.ratio
        }),
        sprite = null;

    let  div = p_box(PIXI, {
        height: 89 * PIXI.ratio,
        border: {
            width: PIXI.ratio | 0,
            color: 0xe5e5e5
        },
        y: underline.y + underline.height + 75 * PIXI.ratio
    });
    let progressText = p_text(PIXI, {
        content: '0%',
        fontSize: 34 * PIXI.ratio,
        x: div.width - 152 * PIXI.ratio,
        relative_middle: { containerHeight: div.height }
    });

    div.addChild(
        p_text(PIXI, {
            content: '下载进度',
            fontSize: 34 * PIXI.ratio,
            x: 30 * PIXI.ratio,
            relative_middle: { containerHeight: div.height }
        }),
        progressText,
    );


    button.myAddChildFn(
        p_text(PIXI, {
            content: '下载',
            fontSize: 30 * PIXI.ratio,
            fill: 0xffffff,
            relative_middle: { containerWidth: button.width, containerHeight: button.height }
        })
    );

    button.onClickFn(() => {
        callBack({
            status: 'download',
            cb: tempFilePath => {
                PIXI.loader.add(tempFilePath).load(() => {
                    sprite = p_img(PIXI, {
                        src: tempFilePath,
                        is_PIXI_loader: true,
                        x: 30 * PIXI.ratio,
                        y: underline.y + underline.height + 200 * PIXI.ratio
                    });
                    sprite.height = ((obj.width - 60 * PIXI.ratio) * sprite.height) / sprite.width;
                    sprite.width = obj.width - 60 * PIXI.ratio;
                    explain.hideFn();
                    button.hideFn();
                    container.addChild(sprite);
                });
            },
            progressCb: (progress) => {
                progressText.turnText(`${progress}%`);
            }
        });
    });

    // 开启headersReceived监听‘按钮’开始
    let onHeadersReceivedButton = p_button(PIXI, {
        y: button.y + button.height + 20 * PIXI.ratio,
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
        relative_middle: { containerWidth: button.width, containerHeight: button.height }
    }));
    onHeadersReceivedButton.onClickFn(() => {
        callBack({
            status: 'onHeadersReceived',
            drawFn(res) {
                explain.turnText(`headersReceived监听已开启，请重新返回下载`);
            }
        });
        switchButtonState([{
            button: onHeadersReceivedButton, 
            boolead: false, 
            color: 0xe9e9e9
        }]);
    });
    // 开启headersReceived监听‘按钮’结束

     // 开启中断请求‘按钮’开始
     let abortButton = p_button(PIXI, {
        y: onHeadersReceivedButton.y + onHeadersReceivedButton.height + 20 * PIXI.ratio,
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
        relative_middle: { containerWidth: onHeadersReceivedButton.width, containerHeight: onHeadersReceivedButton.height }
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
        }]);
    });
    // 开启中断请求‘按钮’结束

    container.addChild(goBack, title, api_name, underline, explain, button, logo, logoName, div, onHeadersReceivedButton, abortButton);
    app.stage.addChild(container);

    return container;
};
