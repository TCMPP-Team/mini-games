var requestTask;
var headersReceivedStatus;
var downloadHeadersReceivedStatus;
var uploadHeadersReceivedStatus;

var downloadTask;
var uploadTask;
const requestHeaderReceivedListener = res => {
    wx.showModal({
        confirmText: 'confirm',
        cancelText: 'cancel',
        title: 'Request succeeded',
        content: 'Received HTTP Response Header event'
    });
    console.log('onHeadersReceived', res);
}

const downloadHeaderReceivedListener = res => {
    wx.showModal({
        confirmText: 'confirm',
        cancelText: 'cancel',
        title: 'Download succeeded',
        content: 'Received HTTP Response Header event'
    });
    console.log('download onHeadersReceived', res);
}

const uploadHeaderReceivedListener = res => {
    wx.showModal({
        confirmText: 'confirm',
        cancelText: 'cancel',
        title: 'Upload succeeded',
        content: 'Received HTTP Response Header event'
    });
    console.log('upload onHeadersReceived', res);
}

module.exports = {
    request(callback, isAbort) {
        requestTask = wx.request({
            url: 'https://mp.weixin.qq.com',
            data: {
                theme: 'light',
                noncestr: Date.now()
            },
            timeout: 3000,
            method: 'get',
            header: {
                'content-type': 'application/json' // 默认值
            },
            dataType: 'json',
            responseType: 'arraybuffer',
            success(res) {
                console.log(res);
                wx.showToast({
                    title: '请求成功',
                    icon: 'success',
                    duration: 1000
                });
                callback && callback(res);
            },
            fail(errMsg) {
                console.log(errMsg)
                wx.showToast({
                    title: '请求失败',
                    icon: 'error',
                    duration: 1000
                });
            }
        });

        if(isAbort) {
            requestTask.abort();
        }

        if(headersReceivedStatus === 'on') {
            requestTask.onHeadersReceived(requestHeaderReceivedListener);
        } else if(headersReceivedStatus === 'off') {
            requestTask.offHeadersReceived(requestHeaderReceivedListener);
        }
    },
    onHeadersReceived() {
        headersReceivedStatus = 'on';
    },
    offHeadersReceived() {
        headersReceivedStatus = 'off';
    },
    downloadFile(callback, progressCb, isAbort) {
        downloadTask = wx.downloadFile({
            url: 'https://res.wx.qq.com/wechatgame/product/webpack/userupload/20190812/game.png',
            success(res) {
                wx.showToast({
                    title: '下载成功',
                    icon: 'success',
                    duration: 1000
                });
                callback && callback(res);
            },
            fail(err) {
                console.log('download fail', err);
                wx.showToast({
                    title: '下载失败',
                    icon: 'error',
                    duration: 1000
                });
            }
        });

        downloadTask.onProgressUpdate((res) => {
            progressCb?.(res.progress);
            console.log('下载进度', res.progress)
            console.log('已经下载的数据长度', res.totalBytesWritten)
            console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
        });

        if(isAbort) {
            downloadTask.abort();
        }

        if(downloadHeadersReceivedStatus === 'on') {
            downloadTask.onHeadersReceived(downloadHeaderReceivedListener);
        } else if(downloadHeadersReceivedStatus === 'off') {
            downloadTask.offHeadersReceived(downloadHeaderReceivedListener);
        }
    },
    onDownloadHeadersReceived() {
        downloadHeadersReceivedStatus = 'on';
    },
    offDownlodHeadersReceived() {
        downloadHeadersReceivedStatus = 'off';
    },
    uploadFile(imageSrc, callback, progressCb, isAbort) {
        wx.showLoading({
            title: '上传中...',
            mask: true
        });
        uploadTask = wx.uploadFile({
            url: 'https://api.juejin.cn/tag_api/v1/query_category_briefs',
            // url: 'https://developers.weixin.qq.com/minigame/dev/api/render/image/wx.createImage.html',
            filePath: imageSrc,
            name: 'data',
            success(res) {
                wx.hideLoading();
                console.log('uploadImage success, res is:', res);
                wx.showToast({
                    title: '上传成功',
                    icon: 'success',
                    duration: 1000
                });
                callback && callback(true);
            },
            fail({ errMsg }) {
                wx.hideLoading();
                console.log('uploadImage fail, errMsg is', errMsg);
                wx.showToast({
                    title: '上传失败',
                    icon: 'error',
                    duration: 1000
                });
                callback && callback(false);
            }
        });

        uploadTask.onProgressUpdate((res) => {
            progressCb?.(res.progress)
            console.log('上传进度', res.progress)
            console.log('已经上传的数据长度', res.totalBytesSent)
            console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
        })

        if(isAbort) {
            uploadTask.abort();
        }

        if(uploadHeadersReceivedStatus === 'on') {
            uploadTask.onHeadersReceived(uploadHeaderReceivedListener);
        } else if(uploadHeadersReceivedStatus === 'off') {
            uploadTask.offHeadersReceived(uploadHeaderReceivedListener);
        }
    },

    onUploadHeadersReceived() {
        uploadHeadersReceivedStatus = 'on';
    },

    offUploadHeadersReceived() {
        uploadHeadersReceivedStatus = 'off';
    },
};
