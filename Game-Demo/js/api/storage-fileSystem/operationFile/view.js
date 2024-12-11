import { p_button, p_text, p_box, p_img} from '../../../libs/component/index';
import fixedTemplate from '../../../libs/template/fixed';
module.exports = function(PIXI, app, obj, callBack) {
    let isSyncApi = false;
    let container = new PIXI.Container(),
        { goBack, title, api_name, underline, logo, logoName } = fixedTemplate(PIXI, {
            obj,
            title: 'operationFile',
            api_name: 'write/read/append/copy/File&unlink'
        }),
        pathBox = p_box(PIXI, {
            height: 88 * PIXI.ratio,
            border: { width: PIXI.ratio, color: 0xe5e5e5 },
            y: underline.height + underline.y + 31 * PIXI.ratio
        }),
        tipText = p_text(PIXI, {
            content: '提示：如果文件不存在，就会先创建文件，再进行\n写入，这里我们创建的文件名是 hello.txt，而写入\n内容是 “hello, world” ',
            fontSize: 32 * PIXI.ratio,
            fill: 0xbebebe,
            align: 'center',
            lineHeight: 45 * PIXI.ratio,
            y: pathBox.height + pathBox.y + 24 * PIXI.ratio,
            relative_middle: { containerWidth: obj.width }
        }),
        writeFileButton = p_button(PIXI, {
            width: 580 * PIXI.ratio,
            y: pathBox.height + pathBox.y + 259 * PIXI.ratio
        }),
        readFileButton = p_button(PIXI, {
            width: 576 * PIXI.ratio,
            height: 90 * PIXI.ratio,
            border: { width: 2 * PIXI.ratio, color: 0xd1d1d1 },
            alpha: 0,
            y: writeFileButton.y + writeFileButton.height + 25 * PIXI.ratio
        }),
        appendFileButton = p_button(PIXI, {
            width: 576 * PIXI.ratio,
            height: 90 * PIXI.ratio,
            border: { width: 2 * PIXI.ratio, color: 0xd1d1d1 },
            alpha: 0,
            y: readFileButton.height + readFileButton.y + 21 * PIXI.ratio
        }),
        copyButton = p_button(PIXI, {
            width: 576 * PIXI.ratio,
            height: 90 * PIXI.ratio,
            border: { width: 2 * PIXI.ratio, color: 0xd1d1d1 },
            alpha: 0,
            y: appendFileButton.height + appendFileButton.y + 21 * PIXI.ratio
        }),
        unlinkButton = p_button(PIXI, {
            width: 576 * PIXI.ratio,
            height: 90 * PIXI.ratio,
            border: { width: 2 * PIXI.ratio, color: 0xd1d1d1 },
            alpha: 0,
            y: copyButton.height + copyButton.y + 21 * PIXI.ratio
        });

    let path;
    pathBox.addChild(
        p_text(PIXI, {
            content: `路径`,
            fontSize: 34 * PIXI.ratio,
            x: 30 * PIXI.ratio,
            relative_middle: { containerHeight: pathBox.height }
        }),
        (path = p_text(PIXI, {
            content: pathTextFn(),
            fontSize: 34 * PIXI.ratio,
            relative_middle: { containerWidth: pathBox.width, containerHeight: pathBox.height }
        }))
    );

    // 写文件 “按钮” 开始
    writeFileButton.myAddChildFn(
        p_text(PIXI, {
            content: '写文件',
            fontSize: 36 * PIXI.ratio,
            fill: 0xffffff,
            relative_middle: { containerWidth: writeFileButton.width, containerHeight: writeFileButton.height }
        })
    );
    writeFileButton.onClickFn(() => {
        callBack({
            status: 'writeFile',
            isSync: isSyncApi,
            drawFn() {
                path.turnText(pathTextFn('/hello.txt'));
                isVisibleFn([readFileButton, appendFileButton, copyButton, unlinkButton], 'showFn');
            }
        });
    });
    // 写文件 “按钮” 结束

    // 读取文件内容 “按钮” 开始
    readFileButton.myAddChildFn(
        p_text(PIXI, {
            content: '读取文件内容',
            fontSize: 36 * PIXI.ratio,
            fill: 0x53535f,
            relative_middle: { containerWidth: readFileButton.width, containerHeight: readFileButton.height }
        })
    );
    readFileButton.onClickFn(() => {
        callBack({
            status: 'readFile',
            isSync: isSyncApi,
        });
    });
    // 读取文件内容 “按钮” 结束

    // 追加文件内容 “按钮” 开始
    appendFileButton.myAddChildFn(
        p_text(PIXI, {
            content: '追加文件内容',
            fontSize: 36 * PIXI.ratio,
            fill: 0x53535f,
            relative_middle: { containerWidth: appendFileButton.width, containerHeight: appendFileButton.height }
        })
    );
    appendFileButton.onClickFn(() => {
        callBack({
            status: 'appendFile',
            isSync: isSyncApi,
        });
    });
    // 追加文件内容 “按钮” 结束

    // 复制文件 “按钮” 开始
    copyButton.myAddChildFn(
        p_text(PIXI, {
            content: '复制文件',
            fontSize: 36 * PIXI.ratio,
            fill: 0x53535f,
            relative_middle: { containerWidth: copyButton.width, containerHeight: copyButton.height }
        })
    );
    copyButton.onClickFn(() => {
        callBack({
            status: 'copyFile',
            isSync: isSyncApi,
        });
    });
    // 复制文件 “按钮” 结束

    // 删除文件 “按钮” 开始
    unlinkButton.myAddChildFn(
        p_text(PIXI, {
            content: '删除文件',
            fontSize: 36 * PIXI.ratio,
            fill: 0x53535f,
            relative_middle: { containerWidth: unlinkButton.width, containerHeight: unlinkButton.height }
        })
    );
    unlinkButton.onClickFn(() => {
        callBack({
            status: 'unlink',
            isSync: isSyncApi,
            drawFn() {
                path.turnText(pathTextFn());
                isVisibleFn([readFileButton, appendFileButton, copyButton, unlinkButton], 'hideFn');
            }
        });
    });
    // 删除文件 “按钮” 结束

    function isVisibleFn(arr, method) {
        for (let i = 0, len = arr.length; i < len; i++) {
            arr[i][method]();
        }
    }

    function pathTextFn(str) {
        return `${wx.env.USER_DATA_PATH}/fileA${str || ''}`;
    }

    isVisibleFn([readFileButton, appendFileButton, copyButton, unlinkButton], 'hideFn');

    wx.getFileSystemManager().access({
        path: pathTextFn('/hello.txt'),
        success() {
            path.turnText(pathTextFn('/hello.txt'));
            isVisibleFn([readFileButton, appendFileButton, copyButton, unlinkButton], 'showFn');
        }
    });

    let socketState = p_box(PIXI, {
        height: 90 * PIXI.ratio
    });

    //绘制 on/off 开关按钮 start
    let off = p_img(PIXI, {
        width: 142 * PIXI.ratio,
        height: 90 * PIXI.ratio,
        src: 'images/off.png',
        x: socketState.width - 152 * PIXI.ratio,
        relative_middle: { containerHeight: socketState.height }
    });
    let on = p_img(PIXI, {
        width: 122 * PIXI.ratio,
        height: 87 * PIXI.ratio,
        src: 'images/on.png',
        x: socketState.width - 142 * PIXI.ratio
    });
    on.hideFn();
    off.onClickFn(() => {
        off.hideFn();
        on.showFn();

        isSyncApi = true;
    });
    on.onClickFn(() => {
        off.showFn();
        on.hideFn();
        isSyncApi = false;
    });
    //绘制 on/off 开关按钮 end

    socketState.addChild(
        p_text(PIXI, {
            content: '是否开启同步',
            fontSize: 30 * PIXI.ratio,
            x: 30 * PIXI.ratio,
            relative_middle: { containerHeight: socketState.height }
        }),
        off,
        on
    );

    let box = p_box(PIXI, {
        height: socketState.y + socketState.height,
        border: {
            width: PIXI.ratio,
            color: 0x999999
        },
        y: tipText.y + tipText.height + 1 * PIXI.ratio
    });

    box.addChild(
        socketState
    );


    container.addChild(
        goBack,
        title,
        api_name,
        underline,
        pathBox,
        tipText,
        writeFileButton,
        readFileButton,
        appendFileButton,
        copyButton,
        unlinkButton,
        logo,
        logoName,
        box
    );
    app.stage.addChild(container);

    return container;
};
