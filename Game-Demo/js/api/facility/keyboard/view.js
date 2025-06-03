import { p_button, p_text } from '../../../libs/component/index';
import fixedTemplate from '../../../libs/template/fixed';
module.exports = function(PIXI, app, obj, callBack) {
    let container = new PIXI.Container(),
        { goBack, title, api_name, underline, logo, logoName } = fixedTemplate(PIXI, {
            obj,
            title: '键盘',
            api_name: 'showKeyboard/hideKeyboard'
        }),

        // 显示默认键盘（文本输入键盘），type为 text 
        showButton = p_button(PIXI, {
            width: 580 * PIXI.ratio,
            y: underline.height + underline.y + 123 * PIXI.ratio
        }),

        // 显示数字键盘，type为 number
        showNumberButton = p_button(PIXI, {
          width: 580 * PIXI.ratio,
          y: underline.height + underline.y + 240 * PIXI.ratio
        }),

        // 显示带小数点的数字键盘，type为 digit
        showDigitButton = p_button(PIXI, {
          width: 580 * PIXI.ratio,
          y: underline.height + underline.y + 360 * PIXI.ratio
        });
    let hideButton = p_button(PIXI, {
        width: 580 * PIXI.ratio,
        y: underline.height + underline.y + 480 * PIXI.ratio
    });

    // 点击更新 “按钮” 开始
    showButton.myAddChildFn(
        p_text(PIXI, {
            content: `显示默认键盘`,
            fontSize: 36 * PIXI.ratio,
            fill: 0xffffff,
            relative_middle: { containerWidth: showButton.width, containerHeight: showButton.height }
        })
    );

    showNumberButton.myAddChildFn(
      p_text(PIXI, {
          content: `显示数字键盘`,
          fontSize: 36 * PIXI.ratio,
          fill: 0xffffff,
          relative_middle: { containerWidth: showButton.width, containerHeight: showButton.height }
      })
    );

    showDigitButton.myAddChildFn(
      p_text(PIXI, {
          content: `显示带小数点的数字键盘`,
          fontSize: 36 * PIXI.ratio,
          fill: 0xffffff,
          relative_middle: { containerWidth: showNumberButton.width, containerHeight: showNumberButton.height }
      })
    );

    hideButton.myAddChildFn(
        p_text(PIXI, {
            content: `隐藏键盘`,
            fontSize: 36 * PIXI.ratio,
            fill: 0xffffff,
            relative_middle: { containerWidth: showButton.width, containerHeight: showButton.height }
        })
    );

    showButton.onClickFn(() => {
        callBack({
            status: 'showKeyboard',
        });
    });

    showNumberButton.onClickFn(() => {
      callBack({
          status: 'showKeyboard',
          params: {
            type: 'number'
          }
      });
    });

    showDigitButton.onClickFn(() => {
      callBack({
          status: 'showKeyboard',
          params: {
            type: 'digit'
          }
      });
    });

    hideButton.onClickFn(() => {
        callBack({
            status: 'hideKeyboard',
        });
    });

      // 移除所有键盘事件 “按钮” 开始
     let emptyBtn = p_button(PIXI, {
          width: 540 * PIXI.ratio,
          alpha: 0,
          y: hideButton.height + hideButton.y + 30 * PIXI.ratio
      });
      emptyBtn.addChild(
          p_text(PIXI, {
              content: '移除监听',
              fontSize: 34 * PIXI.ratio,
              relative_middle: { containerWidth: emptyBtn.width, containerHeight: emptyBtn.height }
          })
      );
      emptyBtn.onClickFn(() => {
          callBack({
            status: 'removeListeners'
          });
      });

      // updateKeyboard 按钮
      let updateBtn = p_button(PIXI, {
        width: 540 * PIXI.ratio,
        alpha: 0,
        y: emptyBtn.height + emptyBtn.y + 30 * PIXI.ratio
    });
    updateBtn.addChild(
        p_text(PIXI, {
            content: '更新键盘输入框内容',
            fontSize: 34 * PIXI.ratio,
            relative_middle: { containerWidth: updateBtn.width, containerHeight: updateBtn.height }
        })
    );
    updateBtn.onClickFn(() => {
        callBack({
          status: 'updateKeyboard'
        });
    });

    goBack.callBack = callBack.bind(null, { status: 'destroy' });

    container.addChild(goBack, title, api_name, underline, showButton, showNumberButton, showDigitButton, hideButton, emptyBtn, updateBtn, logo, logoName);

    app.stage.addChild(container);

    return container;
};
