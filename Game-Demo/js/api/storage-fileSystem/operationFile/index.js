import view from './view';
import * as show from '../../../libs/show';
module.exports = function(PIXI, app, obj) {
    const fileSystemManager = wx.getFileSystemManager();
    return view(PIXI, app, obj, data => {
        let { status, drawFn, isSync } = data;
       
        switch (status) {
            case 'writeFile':
                if(isSync) {
                    try {
                        fileSystemManager.writeFileSync(`${wx.env.USER_DATA_PATH}/fileA/hello.txt`, 'hello, world');
                        show.Toast('同步写入文件成功', 'success', 800);

                        drawFn(); // 更新UI
                    } catch(err) {
                        show.Modal(err.toString(), '同步写入文件发生错误');
                    }
                } else {
                    fileSystemManager.writeFile({
                        filePath: `${wx.env.USER_DATA_PATH}/fileA/hello.txt`,
                        data: 'hello, world', // 写入的内容
                        success() {
                            show.Toast('异步写入文件成功', 'success', 800);
    
                            drawFn(); // 更新UI
                        },
                        fail(res) {
                            if (!res.errMsg) return;
    
                            if (res.errMsg.includes('fail no such file or directory')) {
                                res.errMsg = `上级目录 ${JSON.stringify(
                                    `${wx.env.USER_DATA_PATH}/fileA`
                                )} 不存在，请去创建目录`;
    
                                show.Modal(res.errMsg, '异步写入文件发生错误');
                            }
                        }
                    });
                }
                break;

            case 'readFile':
                if(isSync) {
                    try {
                        const res = fileSystemManager.readFileSync(`${wx.env.USER_DATA_PATH}/fileA/hello.txt`, 'utf-8');
                        show.Modal(`同步获取文件成功，返回到内容是 “${res}”`, '同步读取文件成功');
                    } catch(err) {
                        show.Modal(err.toString(), '同步读取文件发生错误');
                    }
                } else {
                    fileSystemManager.readFile({
                        filePath: `${wx.env.USER_DATA_PATH}/fileA/hello.txt`,
                        encoding: 'utf-8',
                        success(res) {
                            show.Modal(`异步获取文件成功，返回到内容是 “${res.data}”`, '异步读取文件成功');
                        },
                        fail(err) {
                            show.Modal(err?.errMsg, '异步读取文件发生错误');
                        }
                    });
                }
                break;

            case 'appendFile':
                if(isSync) {
                    try {
                        fileSystemManager.appendFileSync(`${wx.env.USER_DATA_PATH}/fileA/hello.txt`, ' The Testing API');
                        show.Toast('同步追加文件内容成功', 'success', 800);
                    } catch(err) {
                        show.Modal(err.toString(), '同步追加文件发生错误');
                    } 
                } else {
                    fileSystemManager.appendFile({
                        filePath: `${wx.env.USER_DATA_PATH}/fileA/hello.txt`,
                        data: ' The Testing API', // 新追加的内容
                        success() {
                            show.Toast('异步追加文件成功', 'success', 800);
                        },
                        fail(err) {
                            show.Modal(err?.errMsg, '异步追加文件发生错误');
                        }
                    });
                }
                break;

            case 'copyFile':
                if(isSync) {
                    try {
                        fileSystemManager.copyFileSync(
                            `${wx.env.USER_DATA_PATH}/fileA/hello.txt`,
                            `${wx.env.USER_DATA_PATH}/fileA/hello - copy.txt`
                        );
                        show.Toast('同步复制文件成功', 'success', 800);
                    } catch (err) {
                        show.Modal(err.toString(), '同步复制文件发生错误');
                    }
                } else {
                    fileSystemManager.copyFile({
                        srcPath: `${wx.env.USER_DATA_PATH}/fileA/hello.txt`,  
                        destPath: `${wx.env.USER_DATA_PATH}/fileA/hello - copy.txt`, // 复制并重新命名文件路径
                        success() {
                            show.Toast('异步复制文件成功', 'success', 800);
                        }, 
                        fail(err) {
                            show.Modal(err?.errMsg, '异步复制文件发生错误');
                        }
                    });
                }
                break;

            case 'unlink':
                if(isSync) {
                    try {
                        fileSystemManager.unlinkSync(`${wx.env.USER_DATA_PATH}/fileA/hello.txt`);
                        show.Toast('同步删除文件成功', 'success', 800);
                        drawFn(); // 更新UI
                    } catch(err) {
                        show.Modal(err.toString(), '同步删除文件发生错误');
                    }
                } else {
                    fileSystemManager.unlink({
                        filePath: `${wx.env.USER_DATA_PATH}/fileA/hello.txt`,
                        success() {
                            show.Toast('异步删除文件成功', 'success', 800);
    
                            drawFn(); // 更新UI
                        },
                        fail(err) {
                            show.Modal(err?.errMsg, '异步删除文件发生错误');
                        }
                    });
                }
                break;
        }
    });
};
