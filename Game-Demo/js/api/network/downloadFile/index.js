import view from './view';
import { downloadFile, onDownloadHeadersReceived } from '../apiList';
module.exports = function(PIXI, app, obj) {
    var isAbort = false;
    return view(PIXI, app, obj, res => {
        let { status, cb, progressCb } = res;

        switch(status) {
            case 'download':
                downloadFile(res => {
                    let tempFilePath = res.tempFilePath;
                    cb(tempFilePath); //绘制图片
                }, (progress) => {
                    progressCb?.(progress);
                }, isAbort);
                break;
            case 'onHeadersReceived':
                onDownloadHeadersReceived();
                cb?.();
                break;
            case 'abort':
                isAbort = true;
                cb?.();
                break;
            
        }
    });
};
