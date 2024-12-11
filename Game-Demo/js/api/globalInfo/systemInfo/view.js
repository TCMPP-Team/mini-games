import { p_button, p_text, p_box, p_scroll } from '../../../libs/component/index';
import fixedTemplate from '../../../libs/template/fixed';
import dateFormat from '../../../libs/dateFormat';
module.exports = function(PIXI, app, obj, callBack) {
    let container = new PIXI.Container(),
        { goBack, title, api_name, underline, logo, logoName } = fixedTemplate(PIXI, {
            obj,
            title: '获取系统信息',
            api_name: 'globalInfo/systemInfo/index'
        }),
        scroll = p_scroll(PIXI, {
            height: 700 * PIXI.ratio,
            y: underline.height + underline.y + 78 * PIXI.ratio
        }),
        getSystemInfoButton = p_button(PIXI, {
            width: 580 * PIXI.ratio,
            y: underline.height + underline.y + 89 * PIXI.ratio
        }),
        getSystemInfoSyncButton = p_button(PIXI, {
            width: 580 * PIXI.ratio,
            y: getSystemInfoButton.height + getSystemInfoButton.y + 89 * PIXI.ratio
        });
        
    let div,
    divDeploy = {
        height: 0,
        border: { width: PIXI.ratio | 0, color: 0xe5e5e5 }
    },
    div_container = new PIXI.Container(),
    div_container_child_arr = [];

    function showListInfo(storage) {
        for (let i = 0, arr = Object.keys(storage), len = arr.length; i < len; i++) {
            div_container_child_arr[i] = p_box(PIXI, {
                height: 87 * PIXI.ratio,
                border: {
                    width: PIXI.ratio | 0,
                    color: 0xe5e5e5
                },
                y: i && div_container_child_arr[i - 1].height + div_container_child_arr[i - 1].y - (PIXI.ratio | 0)
            });
    
            div_container_child_arr[i].addChild(
                p_text(PIXI, {
                    content: arr[i],
                    fontSize: 34 * PIXI.ratio,
                    x: 30 * PIXI.ratio,
                    relative_middle: { containerHeight: div_container_child_arr[i].height }
                }),
                (storage[arr[i]] = p_text(PIXI, {
                    content: storage[arr[i]],
                    fontSize: 34 * PIXI.ratio,
                    fill: 0x8f8f8f,
                    relative_middle: {
                        containerWidth: div_container_child_arr[i].width,
                        containerHeight: div_container_child_arr[i].height
                    }
                }))
            );
        }
        divDeploy.height =
        div_container_child_arr[div_container_child_arr.length - 1].y +
        div_container_child_arr[div_container_child_arr.length - 1].height;

        div = p_box(PIXI, divDeploy);
        div_container.addChild(...div_container_child_arr);
        div_container.mask = p_box(PIXI, {
            width: div.width - 30 * PIXI.ratio,
            height: divDeploy.height - 2 * PIXI.ratio,
            x: 30 * PIXI.ratio
        });
        div.addChild(div_container, div_container.mask);
        
        scroll.myAddChildFn(div);
        let whoHigh = div.height > scroll.height;
        scroll.isTouchable(whoHigh);

        container.addChild(scroll);
    }
    

    // 获取系统信息 “按钮” 开始
    getSystemInfoButton.myAddChildFn(
        p_text(PIXI, {
            content: '异步获取系统信息',
            fontSize: 36 * PIXI.ratio,
            fill: 0xffffff,
            relative_middle: {
                containerWidth: getSystemInfoButton.width,
                containerHeight: getSystemInfoButton.height
            }
        })
    );
    getSystemInfoButton.onClickFn(() => {
        callBack({
            status: 'getSystemInfo',
            cb(res) {
                const arr = [];

                Object.keys(res, (key) => {
                    arr.push({
                        key,
                    })
                });
                showListInfo(res);
            }
        });
    });
    // 获取系统信息 “按钮” 结束

     // 获取系统信息 “按钮” 开始
     getSystemInfoSyncButton.myAddChildFn(
        p_text(PIXI, {
            content: '同步获取系统信息',
            fontSize: 36 * PIXI.ratio,
            fill: 0xffffff,
            relative_middle: {
                containerWidth: getSystemInfoSyncButton.width,
                containerHeight: getSystemInfoSyncButton.height
            }
        })
    );
    getSystemInfoSyncButton.onClickFn(() => {
        callBack({
            status: 'getSystemInfoSync',
            cb(res) {
                const arr = [];

                Object.keys(res, (key) => {
                    arr.push({
                        key,
                    })
                });
                showListInfo(res);
            }
        });
    });
    // 获取系统信息 “按钮” 结束

    container.addChild(goBack, title, api_name, underline, getSystemInfoButton, getSystemInfoSyncButton, logo, logoName);
    app.stage.addChild(container);

    return container;
};
