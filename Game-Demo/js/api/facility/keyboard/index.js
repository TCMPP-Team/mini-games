import view from './view';
import * as show from '../../../libs/show';
module.exports = function(PIXI, app, obj) {
  const keyboardHeightChangeListener = (res) => {
    console.log('===onKeyboardHeightChange', res);
  }
  const keyboardInputListener = (res) => {
    console.log('===onKeyboardInput', res);
  }
  const keyboardConfirmListener = (res) => {
    console.log('===onKeyboardConfirm', res);
  }
  const keyboardCompleteListener = (res) => {
    console.log('===onKeyboardComplete', res);
  }

  wx.onKeyboardHeightChange(keyboardHeightChangeListener);
  wx.onKeyboardInput(keyboardInputListener);
  wx.onKeyboardConfirm(keyboardConfirmListener);
  wx.onKeyboardComplete(keyboardCompleteListener);

    return view(PIXI, app, obj, data => {
        let { status } = data;

        switch (status) {
            case 'showKeyboard':
                // 获取全局唯一的版本更新管理器，用于管理小程序更新。
                wx.showKeyboard({
                  confirmHold: false,
                  confirmType: 'search',
                  defaultValue: 'defaultValue',
                  maxLength: 1000,
                  multiple: false,
                  success: res => {
                    console.log('showKeyboard success', res);
                  },
                  fail: err => {
                    console.log('showKeyboard error', err);
                  },
                  complete: result => {
                    console.log('showKeyboard complete', result);
                  }
                });
                break;
            case 'hideKeyboard':
                // 获取全局唯一的版本更新管理器，用于管理小程序更新。
                wx.hideKeyboard({
                  success: res => {
                    console.log('hideKeyboard success', res);
                  },
                  fail: err => {
                    console.log('hideKeyboard error', err);
                  },
                  complete: result => {
                    console.log('hideKeyboard complete', result);
                  }
                });
                break;
            case 'removeListeners':
                wx.offKeyboardHeightChange(keyboardHeightChangeListener);
                wx.offKeyboardInput(keyboardInputListener);
                wx.offKeyboardConfirm(keyboardConfirmListener);
                wx.offKeyboardComplete(keyboardCompleteListener);
                break;
            case 'updateKeyboard':
              wx.updateKeyboard({
                value: '更新的value',
              });
              break;
        }
    });
};
