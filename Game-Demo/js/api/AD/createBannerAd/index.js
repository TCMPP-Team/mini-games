import view from './view';
import * as show from '../../../libs/show';

module.exports = function (PIXI, app, obj) {
  let bannerAd;
  return view(PIXI, app, obj, data => {
    let { status, style, drawFn } = data;
    switch (status) {
      case 'createBannerAd':
        // 创建 banner 广告组件;
        bannerAd = wx.createBannerAd({
          adUnitId: 'bannerTestId',
          adIntervals: 30, // 广告自动刷新的间隔时间，单位为秒，参数值必须大于等于30（该参数不传入时 Banner 广告不会自动刷新）
          style: {
            left: style.left || 0,
            top: style.top || 0,
            width: style.width || 0,
            height: style.height || 0,
          }
        });
        wx.showLoading({ title: '广告打开中...', mask: true });
        // 监听 banner 广告加载事件。
        bannerAd.onLoad(() => {
          wx.hideLoading();
          // 需要主动调用show函数banner 广告才会显示
          bannerAd.show();
          drawFn(); // 更新UI
        });

        // 监听 banner 广告错误事件。
        bannerAd.onError(res => {
          wx.hideLoading();
          show.Modal(res.errMsg, '发生错误');
          drawFn(res); // 更新UI
        });
        break;
      case 'hide':
        // 隐藏 banner 广告
        bannerAd.hide();
        drawFn(); // 更新UI
        break;
      case 'resize':
        bannerAd.onResize(res => {
          console.log("设置的新size ---------------", res.width + Math.random() * 1);
          bannerAd.style.width = res.width + Math.random() * 1;
        });
        bannerAd.style.top = 100;
        bannerAd.style.left = 10;
        // bannerAd.style.height = 10;
        bannerAd.style.width = 120;
        drawFn();
        break;
      case 'show':
        // 显示 banner 广告
        bannerAd.show();
        drawFn(); // 更新UI
        break;
      case 'destroy':
        if (!bannerAd) return;
        bannerAd.hide();
        // 销毁 banner 广告
        bannerAd.destroy();
        bannerAd = null;
        drawFn && drawFn(); // 更新UI
        break;
    }
  });
};
