import view from './view';
import * as show from '../../../libs/show';

module.exports = function (PIXI, app, obj) {
  let rewardedVideo;
  let hasLoad = false;

  const codeObj = {
    1000: '后端接口调用失败',
    1001: '参数错误',
    1002: '广告单元无效',
    1003: '内部错误',
    1004: '无合适的广告',
    1005: '广告组件审核中',
    1006: '广告组件被驳回',
    1007: '广告组件被封禁',
    1008: '广告单元已关闭'
  };

  // 初始化广告
  const initAd = () => {
    rewardedVideo = wx.createRewardedVideoAd({
      adUnitId: Math.round(Math.random())
        ? '123' // 长视频
        : '456', // 短视频
      multiton: false,
      disableFallbackSharePage: false,
    });
  }

  return view(PIXI, app, obj, data => {
    let { status, drawFn } = data;
    switch (status) {
      case 'createRewardedVideoAd':
        initAd();
        drawFn();
        hasLoad = false;
        // 监听激励视频错误事件
        // rewardedVideo.onError(res => {
        //   show.Modal(res?.errMsg || '激励广告加载失败', codeObj[res.errCode]);
        // });

        // 监听激励视频
        // rewardedVideo.onLoad(() => {
        //   console.log("wx.createRewardedVideoAd.onLoad call -----------------");
        // });
        break;
      case 'load':
        wx.showLoading({ title: "加载激励广告" });
        rewardedVideo.load().then(() => {
          wx.hideLoading();
          hasLoad = true;
          drawFn(true);
        }).catch(() => {
          wx.hideLoading();
          drawFn(false);
          hasLoad = false;
        });
        break
      case 'show':
        // 显示 激励视频广告
        if (!hasLoad) {
          initAd();
          rewardedVideo.onLoad(() => {
            drawFn(false); // 更新UI
          })
        }
        rewardedVideo
          .show()
          .then(() => {
            // 监听用户点击 关闭广告 按钮的事件
            rewardedVideo.onClose(res => {
              res.isEnded ? show.Modal('已获得奖励', '演示结果') : show.Modal('视频还没看完获取奖励失败', '演示结果');
              // 取消监听用户点击 关闭广告 按钮的事件
              rewardedVideo.offClose();
              drawFn(); // 更新UI
            });
          })
          .catch(res => {
            show.Modal(res.errMsg, codeObj[res.errCode]);
            // 失败后重新加载广告
            rewardedVideo
              .load()
              .then(drawFn) // 更新UI
              .catch(res => {
                show.Modal(res.errMsg, codeObj[res.errCode]);
                drawFn(); // 更新UI
              });
          });
        break;
      case 'destroy':
        if (!rewardedVideo) return;
        if (rewardedVideo.destroy) {
          // 销毁 激励视频广告
          rewardedVideo.destroy();
          rewardedVideo = null;
          drawFn();
        } else drawFn(); // 更新UI
        break;
    }
  });
};
