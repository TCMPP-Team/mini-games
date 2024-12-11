import { p_circle, p_img, p_text } from '../../../libs/component/index';
import fixedTemplate from '../../../libs/template/fixed';
module.exports = function(PIXI, app, obj, callBack) {
    let container = new PIXI.Container(),
        { goBack, title, api_name, underline, logo, logoName } = fixedTemplate(PIXI, {
            obj,
            title: '录音',
            api_name: 'RecorderManager、InnerAudioContext'
        }),
        totalTime = p_text(PIXI, {
            content: '00:00:00',
            fontSize: 60 * PIXI.ratio,
            y: underline.y + underline.height + 125 * PIXI.ratio,
            relative_middle: { point: obj.width / 2 }
        }),
        writeTime = p_text(PIXI, {
            content: '00:00:00',
            fontSize: 30 * PIXI.ratio,
            y: underline.y + underline.height + 229 * PIXI.ratio,
            relative_middle: { point: obj.width / 2 }
        }),
        recordButton = p_img(PIXI, {
            width: 150 * PIXI.ratio,
            y: underline.y + underline.height + 276 * PIXI.ratio,
            src: 'images/record.png',
            relative_middle: { containerWidth: obj.width }
        }),
        stopRecordButton = p_circle(PIXI, {
            radius: 55 * PIXI.ratio,
            border: { width: 20 * PIXI.ratio, color: 0xffffff },
            background: { color: 0xf55c23 },
            x: obj.width / 2,
            y: underline.y + underline.height + 351 * PIXI.ratio
        }),
        playVoiceButton = p_img(PIXI, {
            width: recordButton.width,
            y: underline.y + underline.height + 323 * PIXI.ratio,
            src: 'images/play.png',
            relative_middle: { containerWidth: obj.width }
        }),
        stopVoiceButton = p_img(PIXI, {
            width: recordButton.width,
            x: 113 * PIXI.ratio,
            y: playVoiceButton.y,
            src: 'images/stop.png'
        }),
        trashButton = p_img(PIXI, {
            width: recordButton.width,
            x: playVoiceButton.x + playVoiceButton.width + 100 * PIXI.ratio,
            y: playVoiceButton.y,
            src: 'images/trash.png'
        });

    let clock,
        time = 0,
        playTime = 0,
        runStopRecord,
        runStopVoice;

    writeTime.hideFn();

    // 开始录音 “按钮” 开始
    recordButton.onClickFn(() => {
        callBack({
            status: 'record',
            drawFn(type) {
                if (type) return recordButton.hideFn();
                stopRecordButton.showFn();
                clock = setInterval(() => {
                    time++;
                    totalTimeFn(time);
                }, 1000);
            }
        });
    });
    // 开始录音 “按钮” 结束

    // 结束录音 “按钮” 开始
    stopRecordButton.onClickFn(
        (runStopRecord = () => {
            stopRecordButton.visible &&
                callBack({
                    status: 'stopRecord',
                    drawFn(type) {
                        if (type === 'hide') return stopRecordButton.hideFn();

                        if (type === +type) {
                            clearClock();
                            correctTimeFn(Math.round(type / 1000), true);
                            isVisibleFn([writeTime, playVoiceButton, trashButton], 'showFn');
                        }
                    }
                });
        })
    );
    stopRecordButton.hideFn();
    // 结束录音 “按钮” 结束

    // 播放音频 “按钮” 开始
    playVoiceButton.onClickFn(() => {
        totalTimeFn(0);
        callBack({
            status: 'playVoice',
            drawFn(status, duration) {
                switch (status) {
                    case 'play':
                        clock = setInterval(() => {
                            playTime++;
                            totalTimeFn(playTime);
                        }, 1000);
                        playVoiceButton.hideFn();
                        stopVoiceButton.showFn();
                        trashButton.setPositionFn({ x: stopVoiceButton.x + stopVoiceButton.width + 225 * PIXI.ratio });
                        break;
                    case 'ended':
                        clearClock();
                        playTime = 0;
                        correctTimeFn(Math.round(duration || time));
                        playStopSwitchUI();
                        callBack({ status: 'stopVoic' });
                        break;
                    case 'stop':
                        runStopVoice();
                        break;
                }
            }
        });
    });
    playVoiceButton.hideFn();
    // 播放音频 “按钮” 结束

    // 终止播放 “按钮” 开始
    stopVoiceButton.onClickFn(
        (runStopVoice = () => {
            callBack({
                status: 'stopVoic',
                drawFn() {
                    playTime = 0;
                    totalTimeFn(0);
                    clearClock();
                    playStopSwitchUI();
                }
            });
        })
    );
    stopVoiceButton.hideFn();
    // 终止播放 “按钮” 结束

    // 销毁音频 “按钮” 开始
    trashButton.onClickFn(() => {
        callBack({
            status: 'trash',
            drawFn() {
                isVisibleFn([stopVoiceButton, playVoiceButton, trashButton], 'hideFn');
                trashButton.setPositionFn({ x: playVoiceButton.x + playVoiceButton.width + 100 * PIXI.ratio });

                time = playTime = 0;
                totalTimeFn(0);
                clearClock();
                recordButton.showFn();
                writeTime.hideFn();
            }
        });
    });
    trashButton.hideFn();
    // 销毁音频 “按钮” 结束

    function totalTimeFn(time) {
        let hour, minute, second;
        hour = (time / 3600) | 0;
        minute = ((time % 3600) / 60) | 0;
        second = (time % 3600) % 60;
        try {
            totalTime.turnText([hour, minute, second].map(item => ('00' + item).slice((item + '').length)).join(':'));
        } catch (e) {
            new Promise(res => {
                res([hour, minute, second].map(item => ('00' + item).slice((item + '').length)).join(':'));
            }).then(time => {
                totalTime.turnText(time);
            });
        }
    }

    function correctTimeFn(actualTime, reset) {
        time = actualTime;
        totalTimeFn(time);
        writeTime.turnText(totalTime.text);
        reset && totalTimeFn(0);
    }

    function isVisibleFn(arr, method) {
        for (let i = 0, len = arr.length; i < len; i++) {
            arr[i][method]();
        }
    }

    function playStopSwitchUI() {
        playVoiceButton.showFn();
        stopVoiceButton.hideFn();
        trashButton.setPositionFn({ x: playVoiceButton.x + playVoiceButton.width + 100 * PIXI.ratio });
    }

    wx.onShow(runStopRecord);
    wx.onHide(clearClock);
    function clearClock() {
        clearInterval(clock);
    }

    goBack.callBack = () => {
        callBack({ status: 'stopRecord' });
        clearClock();
        callBack({ status: 'trash' });
        wx.offShow(runStopRecord);
        wx.offHide(clearClock);
    };

    container.addChild(
        goBack,
        title,
        api_name,
        underline,
        totalTime,
        writeTime,
        recordButton,
        stopRecordButton,
        playVoiceButton,
        stopVoiceButton,
        trashButton,
        logo,
        logoName
    );

    app.stage.addChild(container);

    return container;
};
