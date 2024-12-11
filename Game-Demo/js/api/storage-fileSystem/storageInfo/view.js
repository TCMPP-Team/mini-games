import { p_button, p_text, p_box } from '../../../libs/component/index';
import fixedTemplate from '../../../libs/template/fixed';
module.exports = function(PIXI, app, obj, callBack) {
    let container = new PIXI.Container(),
        { goBack, title, api_name, underline, logo, logoName } = fixedTemplate(PIXI, {
            obj,
            title: '数据储存信息',
            api_name: 'getStorageInfo/getStorageInfoSync'
        }),
        div,
        getStorageInfoButton,
        getStorageInfoSyncButton;

    let storage = {
            key: 'miniGame',
            value: Math.random()
                .toString(36)
                .substr(2)
        },
        divDeploy = {
            height: 0,
            border: {
                width: PIXI.ratio | 0,
                color: 0xe5e5e5
            },
            y: underline.height + underline.y + 81 * PIXI.ratio
        },
        div_container = new PIXI.Container(),
        div_container_child_arr = [];

        function showStorageInfo(storage) {
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
            container.addChild(div);
        }
    
    // 存储数据 “按钮” 开始
    getStorageInfoButton = p_button(PIXI, {
        width: 360 * PIXI.ratio,
        height: 80 * PIXI.ratio,
        color: 0x05c25f,
        y: underline.height + underline.y + 400 * PIXI.ratio
    });
    getStorageInfoButton.myAddChildFn(
        p_text(PIXI, {
            content: `异步获取storage信息`,
            fontSize: 30 * PIXI.ratio,
            fill: 0xffffff,
            fontWeight: 'bold',
            relative_middle: { containerWidth: getStorageInfoButton.width, containerHeight: getStorageInfoButton.height }
        })
    );
    getStorageInfoButton.onClickFn(() => {
        callBack({ 
            status: 'getStorageInfo',  
            cb: (res) => {
                const { currentSize, keys, limitSize } = res;
                showStorageInfo({
                    currentSize,
                    keys: `[ ${keys.join(',')} ]`,
                    limitSize
                });
            }
        });
    });
    // 存储数据 “按钮” 结束

     // 同步存储数据 “按钮” 开始
    getStorageInfoSyncButton = p_button(PIXI, {
        width: 360 * PIXI.ratio,
        height: 80 * PIXI.ratio,
        color: 0x05c25f,
        y: getStorageInfoButton.height + getStorageInfoButton.y + 20 * PIXI.ratio
    });
    getStorageInfoSyncButton.myAddChildFn(
        p_text(PIXI, {
            content: `同步获取storage信息`,
            fontSize: 30 * PIXI.ratio,
            fill: 0xffffff,
            fontWeight: 'bold',
            relative_middle: { containerWidth: getStorageInfoSyncButton.width, containerHeight: getStorageInfoSyncButton.height }
        })
    );
    getStorageInfoSyncButton.onClickFn(() => {
        callBack({ 
            status: 'getStorageInfoSync', 
            cb: res => {
                const { currentSize, keys, limitSize } = res;
                showStorageInfo({
                    currentSize,
                    keys: `[ ${keys.join(',')} ]`,
                    limitSize
                });
            }
        });
    });
    // 同步存储数据 “按钮” 结束

    container.addChild(
        goBack,
        title,
        api_name,
        underline,
        // div,
        getStorageInfoButton,
        getStorageInfoSyncButton,
        logo,
        logoName
    );

    app.stage.addChild(container);

    return container;
};
