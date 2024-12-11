import { p_text, p_line, p_box, p_img, p_button } from '../../../libs/component/index';
import fixedTemplate from '../../../libs/template/fixed';
import { switchButtonState } from '../../../libs/util';

module.exports = function(PIXI, app, obj, callBack) {
    let container = new PIXI.Container(),
        { goBack, title, api_name, underline, logo, logoName } = fixedTemplate(PIXI, {
            obj,
            title: '上传文件',
            api_name: 'uploadFile'
        }),
        box = p_box(PIXI, {
            y: underline.y + underline.height + 150 * PIXI.ratio,
            height: obj.width / 2,
            border: {
                width: PIXI.ratio | 0,
                color: 0x999999
            }
        }),
        box_child = new PIXI.Container(),
        sprite = null;

    box_child.y = -20 * PIXI.ratio;
    box_child.addChild(
        p_line(
            PIXI,
            {
                width: 4 * PIXI.ratio,
                color: 0x999999
            },
            [(obj.width - obj.width / 8) / 2, box.height / 2],
            [obj.width / 8, 0]
        ),
        p_line(
            PIXI,
            {
                width: 4 * PIXI.ratio,
                color: 0x999999
            },
            [obj.width / 2, (box.height - obj.width / 8) / 2],
            [0, obj.width / 8]
        ),
        p_text(PIXI, {
            content: '选择图片',
            fontSize: 28 * PIXI.ratio,
            fill: 0x999999,
            y: box.height - obj.width / 6,
            relative_middle: { containerWidth: box.width }
        })
    );

    box.addChild(box_child);
    box.onClickFn(() => {
        box.interactive = false;
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album'],
            success(res) {
                console.log('chooseImage success, temp path is', res.tempFilePaths[0]);
                const imageSrc = res.tempFilePaths[0];
                callBack({
                    status: 'upload',
                    imageSrc,
                    callback: bool => {
                        if (bool) {
                            PIXI.loader.add(imageSrc).load(() => {
                                let width = void 0,
                                    height = void 0;
                                sprite = p_img(PIXI, {
                                    src: imageSrc,
                                    is_PIXI_loader: true,
                                    y: -PIXI.ratio | 0
                                });
                                if (sprite.width > sprite.height) {
                                    width = box.width;
                                    height = (width * sprite.height) / sprite.width;
                                    if (box.height / height < 1) {
                                        width = (box.height * width) / height;
                                        height = box.height - ~~PIXI.ratio * 3;
                                    }
                                } else {
                                    width = (box.height * sprite.width) / sprite.height;
                                    height = box.height - ~~PIXI.ratio * 3;
                                }
                                sprite.width = width;
                                sprite.height = height;
                                sprite.setPositionFn({
                                    relative_middle: { containerWidth: box.width, containerHeight: box.height }
                                });
                                box_child.visible = false;
                                box.addChild(sprite);
                            });
                            return;
                        }
                        box.interactive = true;
                    },
                    progressCb: (progress) => {
                        progressText.turnText(`${progress}%`)
                    }
                });
            },
            fail({ errMsg }) {
                box.interactive = true;
                console.log('chooseImage fail, err is', errMsg);
            }
        });
    });

    let  div = p_box(PIXI, {
        height: 89 * PIXI.ratio,
        border: {
            width: PIXI.ratio | 0,
            color: 0xe5e5e5
        },
        y: box.y + box.height + 75 * PIXI.ratio
    });
    let progressText = p_text(PIXI, {
        content: '0%',
        fontSize: 34 * PIXI.ratio,
        x: div.width - 152 * PIXI.ratio,
        relative_middle: { containerHeight: div.height }
    });

    div.addChild(
        p_text(PIXI, {
            content: '上传进度',
            fontSize: 34 * PIXI.ratio,
            x: 30 * PIXI.ratio,
            relative_middle: { containerHeight: div.height }
        }),
        progressText,
    );

    // 开启headersReceived监听‘按钮’开始
    let onHeadersReceivedButton = p_button(PIXI, {
        y: div.y + div.height + 20 * PIXI.ratio,
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
        relative_middle: { containerWidth: div.width, containerHeight: div.height }
    }));
    onHeadersReceivedButton.onClickFn(() => {
        callBack({
            status: 'onHeadersReceived',
            drawFn(res) {
                // explain.turnText(`headersReceived监听已开启，请重新返回下载`);
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
                // explain.turnText(`中断请求已开启，请重新发起请求`);
            }
        });
        switchButtonState([{
            button: abortButton, 
            boolead: false, 
            color: 0xe9e9e9
        }]);
    });
    // 开启中断请求‘按钮’结束

    container.addChild(goBack, title, api_name, underline, box, logo, logoName, div, abortButton, onHeadersReceivedButton);

    app.stage.addChild(container);

    return container;
};
