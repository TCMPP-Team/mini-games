import view from './view';
import show from '../../../libs/show';
module.exports = function(PIXI, app, obj) {
    return view(PIXI, app, obj, data => {
        let { status, drawFn } = data;
        switch (status) {
            case 'getLocation':
                wx.getLocation({
                    success: (res) => {
                        show.Modal(`获取成功 ${JSON.stringify(res)}`);
                        drawFn(res);
                    }, // 获取成功后直接调用drawFn函数修改UI
                    fail: err => {
                        show.Modal(`获取失败 ${JSON.stringify(err)}`);
                        console.log('getLocation fail', err);
                    }
                });
                break;
        }
    });
};

//  getLocation 需要在game.json 中声明 permission 字段
//  "permission": {
//     "scope.userLocation": {
//         "desc": "你的位置信息将用于小程序位置接口的效果展示"
//     }
// }
