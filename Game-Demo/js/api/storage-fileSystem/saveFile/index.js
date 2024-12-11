import view from './view';
import * as show from '../../../libs/show';
module.exports = function(PIXI, app, obj) {
    return view(PIXI, app, obj, data => {
        let { status, index, isSync } = data;
        switch (status) {
            case 'saveFile':
                wx.showLoading({ title: '生成临时文件中', mask: true });
                // 调用downloadFile把网络资源生成临时路径
                wx.downloadFile({
                    url: 'https://res.wx.qq.com/wechatgame/product/webpack/userupload/20190813/advideo.MP4',
                    success(res) {
                        wx.hideLoading();
                        let pathArr = [`${wx.env.USER_DATA_PATH}/fileA/video.MP4`, ''][index],
                            filePath;

                        // 不传filePath属性，就会保存为本地缓存文件
                        pathArr && (filePath = { filePath: pathArr });

                        if(isSync) {
                            try {
                                if(filePath?.filePath) {
                                    wx.getFileSystemManager().saveFileSync(res.tempFilePath, filePath?.filePath);
                                } else {
                                    wx.getFileSystemManager().saveFileSync(res.tempFilePath);
                                }
                               
                                show.Toast('同步保存文件成功', 'success', 800);
                            } catch(err) {
                                show.Modal(err.toString(), '同步保存文件发生错误');
                            }
                        } else {
                            wx.getFileSystemManager().saveFile({
                                tempFilePath: res.tempFilePath,
                                ...filePath,
                                recursive: true,
                                success() {
                                    show.Toast('异步保存文件成功', 'success', 800);
                                },
                                fail(res) {
                                    if (!res.errMsg) return;
    
                                    if (res.errMsg.includes('fail exceeded the maximum size of the file storage limit 50M'))
                                        return show.Modal('超过文件存储限制的最大大小50M', '发生错误');
    
                                    if (res.errMsg.includes('fail no such file or directory')) {
                                        res.errMsg = `上级目录 ${JSON.stringify(pathArr)} 不存在，请去创建目录`;
    
                                        show.Modal(res.errMsg, '异步保存文件发生错误');
                                    }
                                }
                            });
                        }
                    },
                    fail: () => {
                        wx.hideLoading();
                    }
                });

                break;
        }
    });
};
