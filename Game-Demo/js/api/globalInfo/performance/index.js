import view from './view';
import * as show from '../../../libs/show';
module.exports = function(PIXI, app, obj) {
    return view(PIXI, app, obj, data => {
        let { status } = data;
        switch (status) {
            case 'triggerGC':
                wx.triggerGC();
                show.Modal('触发垃圾回收成功');
                break;
        }
    });
};
