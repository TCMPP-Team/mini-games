import { p_button, p_text, p_box } from '../../../libs/component/index';
import fixedTemplate from '../../../libs/template/fixed';
module.exports = function(PIXI, app, obj, callBack) {
    let container = new PIXI.Container(),
        { goBack, title, api_name, underline, logo, logoName } = fixedTemplate(PIXI, {
            obj,
            title: '生命周期',
            api_name: 'onShow/onHide'
        }),
        onShowButton,
        offShowButton,
        onHideButton,
        offHideButton;

    // 监听onShow “按钮” 开始
    onShowButton = p_button(PIXI, {
        width: 360 * PIXI.ratio,
        height: 80 * PIXI.ratio,
        color: 0x05c25f,
        y: underline.height + underline.y + 59 * PIXI.ratio
    });
    onShowButton.myAddChildFn(
        p_text(PIXI, {
            content: `监听onShow`,
            fontSize: 30 * PIXI.ratio,
            fill: 0xffffff,
            fontWeight: 'bold',
            relative_middle: { containerWidth: onShowButton.width, containerHeight: onShowButton.height }
        })
    );
    onShowButton.onClickFn(() => {
        callBack({ status: 'onShow' });
    });
    // 监听onShow “按钮” 结束

     // 移除onShow监听 “按钮” 开始
     offShowButton = p_button(PIXI, {
        width: 360 * PIXI.ratio,
        height: 80 * PIXI.ratio,
        alpha: 0,
        y: onShowButton.height + onShowButton.y + 20 * PIXI.ratio
    });
    offShowButton.myAddChildFn(
        p_text(PIXI, {
            content: `移除onShow监听`,
            fontSize: 30 * PIXI.ratio,
            fontWeight: 'bold',
            relative_middle: { containerWidth: offShowButton.width, containerHeight: offShowButton.height }
        })
    );
    offShowButton.onClickFn(() => {
        callBack({ status: 'offShow' });
    });
    // 移除onShow监听 “按钮” 结束

    // 监听onHide “按钮” 开始
    onHideButton = p_button(PIXI, {
        width: 360 * PIXI.ratio,
        height: 80 * PIXI.ratio,
        color: 0x05c25f,
        y: offShowButton.height + offShowButton.y + 20 * PIXI.ratio
    });
    onHideButton.myAddChildFn(
        p_text(PIXI, {
            content: `监听onHide`,
            fontSize: 30 * PIXI.ratio,
            fill: 0xffffff,
            fontWeight: 'bold',
            relative_middle: { containerWidth: onHideButton.width, containerHeight: onHideButton.height }
        })
    );
    onHideButton.onClickFn(() => {
        callBack({ status: 'onHide' });
    });
    // 监听onHide “按钮” 结束

    // 移除onHide监听 “按钮” 开始
    offHideButton = p_button(PIXI, {
        width: 360 * PIXI.ratio,
        height: 80 * PIXI.ratio,
        alpha: 0,
        y: onHideButton.height + onHideButton.y + 20 * PIXI.ratio
    });
    offHideButton.myAddChildFn(
        p_text(PIXI, {
            content: `移除onHide监听`,
            fontSize: 30 * PIXI.ratio,
            fontWeight: 'bold',
            relative_middle: { containerWidth: offHideButton.width, containerHeight: offHideButton.height }
        })
    );
    offHideButton.onClickFn(() => {
        callBack({ status: 'offHide' });
    });
    // 移除onHide监听 “按钮” 结束

    container.addChild(
        goBack,
        title,
        api_name,
        underline,
        onShowButton,
        offShowButton,
        onHideButton,
        offHideButton,
        logo,
        logoName
    );

    app.stage.addChild(container);

    return container;
};
