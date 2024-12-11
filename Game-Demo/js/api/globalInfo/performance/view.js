import { p_button, p_text, p_box } from '../../../libs/component/index';
import fixedTemplate from '../../../libs/template/fixed';
module.exports = function(PIXI, app, obj, callBack) {
    let container = new PIXI.Container(),
        { goBack, title, api_name, underline, logo, logoName } = fixedTemplate(PIXI, {
            obj,
            title: '性能',
            api_name: 'performance'
        }),
        triggerGCButton;

    // triggerGC “按钮” 开始
    triggerGCButton = p_button(PIXI, {
        width: 360 * PIXI.ratio,
        height: 80 * PIXI.ratio,
        color: 0x05c25f,
        y: underline.height + underline.y + 59 * PIXI.ratio
    });
    triggerGCButton.myAddChildFn(
        p_text(PIXI, {
            content: `triggerGC`,
            fontSize: 30 * PIXI.ratio,
            fill: 0xffffff,
            fontWeight: 'bold',
            relative_middle: { containerWidth: triggerGCButton.width, containerHeight: triggerGCButton.height }
        })
    );
    triggerGCButton.onClickFn(() => {
        callBack({ status: 'triggerGC' });
    });
    // triggerGC “按钮” 结束

    container.addChild(
        goBack,
        title,
        api_name,
        underline,
        triggerGCButton,
        logo,
        logoName
    );

    app.stage.addChild(container);

    return container;
};
