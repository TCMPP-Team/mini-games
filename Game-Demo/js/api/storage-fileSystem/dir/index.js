import view from './view';
import * as show from '../../../libs/show';
module.exports = function(PIXI, app, obj) {
    const fileSystemManager =  wx.getFileSystemManager();
    return view(PIXI, app, obj, data => {
        let { status, drawFn, isSync } = data;
        switch (status) {
            case 'mkdir':
                if(isSync) {
                    try {
                        const result = fileSystemManager.mkdirSync(`${wx.env.USER_DATA_PATH}/fileA`, true);
                        drawFn(); // 更新UI
                        show.Toast('同步创建目录成功', 'success', 800);
                        console.log('mkdirSync result', result);
                    } catch(err) {
                        show.Modal(err.toString(), '同步创建目录错误');
                    }
                } else {
                    fileSystemManager.mkdir({
                        dirPath: `${wx.env.USER_DATA_PATH}/fileA`,
                        recursive: true,
                        success() {
                            drawFn(); // 更新UI
    
                            show.Toast('异步创建目录成功', 'success', 800);
                        },
                        fail(err) {
                            console.log('mkdir fail', err);
                            show.Modal(err?.errMsg, '异步创建目录错误');
                        },
                        complete(result) {
                            console.log('mkdir result', result);
                        }
                    });
                }
                break;
            case 'rmdir':
                if(isSync) {
                    try {
                        fileSystemManager.rmdirSync(`${wx.env.USER_DATA_PATH}/fileA`, true);
                        drawFn(); // 更新UI
                            
                        show.Toast('同步删除目录成功', 'success', 800);
                        // console.log('rmdirSync result', result);
                    } catch(err) {
                        show.Modal(err.toString(), '同步删除目录错误');
                    }
                } else {
                    fileSystemManager.rmdir({
                        dirPath: `${wx.env.USER_DATA_PATH}/fileA`,
                        recursive: true,
                        success() {
                            drawFn(); // 更新UI
                            
                            show.Toast('异步删除目录成功', 'success', 800);
                        },
                        fail(err) {
                            console.log('rmdir fail', err);
                            show.Modal(err?.errMsg, '异步删除目录错误');
                        },
                        complete(result) {
                            console.log('rmdir result', result);
                        }
                    });
                }
                break;
        }
    });
};
