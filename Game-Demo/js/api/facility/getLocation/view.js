import { p_button, p_text, p_box } from '../../../libs/component/index';
import fixedTemplate from '../../../libs/template/fixed';
module.exports = function(PIXI, app, obj, callBack) {
    let container = new PIXI.Container(),
        { goBack, title, api_name, underline, logo, logoName } = fixedTemplate(PIXI, {
            obj,
            title: '获取当前位置',
            api_name: 'getLocation'
        }),
        div = p_box(PIXI, {
            height: 400 * PIXI.ratio,
            y: underline.y + underline.height + 80 * PIXI.ratio
        });

        let locationInfo = {
            longitude: '经度',
            latitude: '纬度',
            altitude: '高度',
            speed: '速度',
            accuracy: '位置精确度',
            verticalAccuracy: '垂直精度',
            horizontalAccuracy: '水平精度'
        },
        divDeploy = {
            height: 0,
            border: {
                width: PIXI.ratio | 0,
                color: 0xe5e5e5
            },
            y: underline.height + underline.y + 75 * PIXI.ratio
        },
        div_container = new PIXI.Container(),
        div_container_child_arr = [];

        for (let i = 0, arr = Object.keys(locationInfo), len = arr.length; i < len; i++) {
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
                    content: locationInfo[arr[i]],
                    fontSize: 34 * PIXI.ratio,
                    x: 30 * PIXI.ratio,
                    relative_middle: { containerHeight: div_container_child_arr[i].height }
                }),
                (locationInfo[arr[i]] = p_text(PIXI, {
                    content: '未获取',
                    fontSize: 34 * PIXI.ratio,
                    fill: 0xbebebe,
                    relative_middle: {
                        containerWidth: div_container_child_arr[i].width,
                        containerHeight: div_container_child_arr[i].height
                    }
                }))
            );
        }
    
        divDeploy.height = div_container_child_arr[div_container_child_arr.length - 1].y + div_container_child_arr[div_container_child_arr.length - 1].height;
    
        div = p_box(PIXI, divDeploy);
        div_container.addChild(...div_container_child_arr);
        div_container.mask = p_box(PIXI, {
            width: div.width - 30 * PIXI.ratio,
            height: divDeploy.height - 2 * PIXI.ratio,
            x: 30 * PIXI.ratio
        });
        div.addChild(div_container, div_container.mask);


    let getLocationBtn = p_button(PIXI, {
        width: 300 * PIXI.ratio,
        height: 80 * PIXI.ratio,
        y: 1000 * PIXI.ratio,
        radius: 5 * PIXI.ratio
    });
    getLocationBtn.myAddChildFn(
        p_text(PIXI, {
            content: '获取位置',
            fontSize: 30 * PIXI.ratio,
            fill: 0xffffff,
            relative_middle: { containerWidth: getLocationBtn.width, containerHeight: getLocationBtn.height }
        })
    );
    getLocationBtn.onClickFn(() => {
        callBack({
            status: 'getLocation',
            drawFn(data) {
                console.log('getLocation success', data);

                for (let i = 0, arr = Object.keys(locationInfo), len = arr.length; i < len; i++) {
                    locationInfo[arr[i]].turnColors(0x000000);
                    locationInfo[arr[i]].turnText(`${data[arr[i]]}`);
                }

            }
        });
    });

    //清空“按钮”开始
    let wipeData = p_button(PIXI, {
        width: 300 * PIXI.ratio,
        alpha: 0,
        height: 80 * PIXI.ratio,
        y: 1100 * PIXI.ratio,
        radius: 5 * PIXI.ratio
    });
    wipeData.myAddChildFn(
        p_text(PIXI, {
            content: '清空',
            fontSize: 30 * PIXI.ratio,
            relative_middle: { containerWidth: wipeData.width, containerHeight: wipeData.height }
        })
    );
    wipeData.onClickFn(() => {
        for (let i = 0, arr = Object.keys(locationInfo), len = arr.length; i < len; i++) {
            locationInfo[arr[i]].turnColors(0xbebebe);
            locationInfo[arr[i]].turnText(`未获取`);
        }

    });
    //清空“按钮”结束

    container.addChild(goBack, title, api_name, underline, div, getLocationBtn, wipeData, logo, logoName);
    app.stage.addChild(container);

    return container;
};
