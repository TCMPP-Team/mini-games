import view from './view';
import { uploadFile, onUploadHeadersReceived } from '../apiList';
module.exports = function (PIXI, app, obj) {
    var isAbort = false;
    return view(PIXI, app, obj, ({status, imageSrc, callback, progressCb}) => {
        
        switch(status) {
            case 'upload':
                uploadFile(imageSrc, callback, progressCb, isAbort);
                break;
            case 'onHeadersReceived':
                onUploadHeadersReceived();
                callback?.();
                break;
            case 'abort':
                isAbort = true;
                callback?.();
                break;
        }
    });
};
