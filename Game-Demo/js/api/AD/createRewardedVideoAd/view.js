import { p_button, p_text } from '../../../libs/component/index';
import fixedTemplate from '../../../libs/template/fixed';

module.exports = function (PIXI, app, obj, callBack) {

  let container = new PIXI.Container();
  const { goBack, title, api_name, underline, logo, logoName } = fixedTemplate(PIXI, {
    obj,
    title: '激励视频广告',
    api_name: 'createRewardedVideoAd'
  });

  const loadButton = p_button(PIXI, {
    width: 580 * PIXI.ratio,
    y: underline.height + underline.y + 30 * PIXI.ratio
  });

  const showButton = p_button(PIXI, {
    width: 580 * PIXI.ratio,
    y: loadButton.height + loadButton.y + 30 * PIXI.ratio
  });

  const tipText = p_text(PIXI, {
    content: '提示：当前激励视频广告未初始化',
    fontSize: 32 * PIXI.ratio,
    fill: 0xbebebe,
    align: 'center',
    lineHeight: 45 * PIXI.ratio,
    y: showButton.height + showButton.y + 40 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });

  // 点击加载广告
  loadButton.myAddChildFn(
    p_text(PIXI, {
      content: `点击load()广告`,
      fontSize: 36 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: { containerWidth: showButton.width, containerHeight: showButton.height }
    })
  );

  // 点击展示 “按钮” 开始
  showButton.myAddChildFn(
    p_text(PIXI, {
      content: `点击show()广告`,
      fontSize: 36 * PIXI.ratio,
      fill: 0xffffff,
      relative_middle: { containerWidth: showButton.width, containerHeight: showButton.height }
    })
  );

  wx.showLoading({ title: "初始化广告对象" });
  callBack({
    status: 'createRewardedVideoAd',
    drawFn: () => {
      tipText.turnText("已创建广告对象")
      wx.hideLoading();
    }
  })

  // 加载广告 load
  loadButton.onClickFn(() => {
    callBack({
      status: 'load',
      drawFn: (success = false) => {
        tipText.turnText(success ? '激励广告初始化成功' : '广告初始化失败', { fill: success ? 0x53B47B : 0xDF5953 })
      }
    })
  });

  // 展示广告 show
  showButton.onClickFn(() => {
    showButton.isTouchable(false);
    callBack({
      status: 'show', drawFn: (hasLoad = true, success = true) => {
        if (!hasLoad) {
          tipText.turnText(success ? '激励广告初始化成功' : '广告初始化失败', { fill: success ? 0x53B47B : 0xDF5953 })
        }
        showButton.isTouchable(true)
      }
    });
  });

  // 退出页面
  goBack.callBack = () => {
    callBack({
      status: 'destroy',
      drawFn() {
        // window.router.getNowPage(page => {
        //   if (!page.reload)
        //     page.reload = function () {
        //       logo.reloadImg({ src: 'images/logo.png' });
        //     };
        // });
        window.router.delPage();
      }
    });
  };

  container.addChild(goBack, title, api_name, underline, loadButton, showButton, tipText, logo, logoName);
  app.stage.addChild(container);
  return container;
};
