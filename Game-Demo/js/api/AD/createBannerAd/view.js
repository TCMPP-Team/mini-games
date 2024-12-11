import { p_button, p_text } from '../../../libs/component/index';
import fixedTemplate from '../../../libs/template/fixed';
module.exports = function(PIXI, app, obj, callBack) {
    let container = new PIXI.Container(),
        { goBack, title, api_name, underline, logo, logoName } = fixedTemplate(PIXI, {
            obj,
            title: 'banner 广告',
            api_name: 'createBannerAd'
        }),
        bannerAdButton = p_button(PIXI, {
            width: 580 * PIXI.ratio,
            y: underline.height + underline.y + 123 * PIXI.ratio
        }),
        tipText = p_text(PIXI, {
            content: '提示：banner广告组件支持修改自身位置大小、\n更新频率，可在广告组件初始化时进行设置，\n当前广告每30s更新一次请留意！',
            fontSize: 32 * PIXI.ratio,
            fill: 0xbebebe,
            align: 'center',
            lineHeight: 45 * PIXI.ratio,
            y: bannerAdButton.height + bannerAdButton.y + 100 * PIXI.ratio,
            relative_middle: { containerWidth: obj.width }
        }),
        hideButton = p_button(PIXI, {
            width: 576 * PIXI.ratio,
            height: 90 * PIXI.ratio,
            border: { width: 2 * PIXI.ratio, color: 0xd1d1d1 },
            alpha: 0,
            y: underline.height + underline.y + 483 * PIXI.ratio
        }),
        showButton = p_button(PIXI, {
            width: 576 * PIXI.ratio,
            height: 90 * PIXI.ratio,
            border: { width: 2 * PIXI.ratio, color: 0xd1d1d1 },
            alpha: 0,
            y: hideButton.y
        }),
        destroyButton = p_button(PIXI, {
            width: 576 * PIXI.ratio,
            height: 90 * PIXI.ratio,
            border: { width: 2 * PIXI.ratio, color: 0xd1d1d1 },
            alpha: 0,
            y: hideButton.height + hideButton.y + 22 * PIXI.ratio
        });

    tipText.hideFn();

    // 点击展示 “按钮” 开始
    bannerAdButton.myAddChildFn(
        p_text(PIXI, {
            content: `点击展示`,
            fontSize: 36 * PIXI.ratio,
            fill: 0xffffff,
            relative_middle: { containerWidth: bannerAdButton.width, containerHeight: bannerAdButton.height }
        })
    );
    bannerAdButton.onClickFn(() => {
        bannerAdButton.hideFn();
        callBack({
            status: 'createBannerAd',
            style: {
                top: (underline.y + underline.height + 53 * PIXI.ratio) / obj.pixelRatio,
                left: (15 * obj.width) / (375 * obj.pixelRatio),
                width: (345 * obj.width) / (375 * obj.pixelRatio)
            },
            drawFn(res) {
                if (res) return bannerAdButton.showFn();
                tipText.showFn();
                hideButton.showFn();
                destroyButton.showFn();
            }
        });
    });
    // 点击展示 “按钮” 结束

    // 隐藏 banner 广告 “按钮” 开始
    hideButton.myAddChildFn(
        p_text(PIXI, {
            content: `隐藏 banner 广告`,
            fontSize: 36 * PIXI.ratio,
            relative_middle: { containerWidth: hideButton.width, containerHeight: hideButton.height }
        })
    );
    hideButton.onClickFn(() => {
        callBack({
            status: 'hide',
            drawFn() {
                hideButton.hideFn();
                showButton.showFn();
            }
        });
    });
    hideButton.hideFn();
    // 隐藏 banner 广告 “按钮” 结束

    // 显示 banner 广告 “按钮” 开始
    showButton.myAddChildFn(
        p_text(PIXI, {
            content: `显示 banner 广告`,
            fontSize: 36 * PIXI.ratio,
            relative_middle: { containerWidth: showButton.width, containerHeight: showButton.height }
        })
    );
    showButton.onClickFn(() => {
        callBack({
            status: 'show',
            drawFn() {
                showButton.hideFn();
                hideButton.showFn();
            }
        });
    });
    showButton.hideFn();
    // 显示 banner 广告 “按钮” 结束

    // 销毁 banner 广告 “按钮” 开始
    destroyButton.myAddChildFn(
        p_text(PIXI, {
            content: `销毁 banner 广告`,
            fontSize: 36 * PIXI.ratio,
            relative_middle: { containerWidth: destroyButton.width, containerHeight: destroyButton.height }
        })
    );
    destroyButton.onClickFn(() => {
        callBack({
            status: 'destroy',
            drawFn() {
                destroyButton.hideFn();
                showButton.hideFn();
                hideButton.hideFn();
                tipText.hideFn();
                bannerAdButton.showFn();
            }
        });
    });
    destroyButton.hideFn();
    // 销毁 banner 广告 “按钮” 结束

    goBack.callBack = callBack.bind(null, { status: 'destroy' });

    container.addChild(goBack, title, api_name, underline, bannerAdButton, tipText, hideButton, showButton, destroyButton, logo, logoName);

    app.stage.addChild(container);

    return container;
};
