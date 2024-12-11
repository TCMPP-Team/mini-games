import view from './view';
module.exports = function (PIXI, app, obj) {
    return view(PIXI, app, obj, (data) => {
        let { status } = data;
        switch (status) {
            case 'showActionSheet':
                wx.showActionSheet({
                    itemColor: '#ff0000',
                    alertText: '警示文案',
                    itemList: ['item1', 'item2', 'item3', 'item4'],
                    success(e) {
                        console.log(e.tapIndex);
                    },
                    fail: err => {
                        console.log('showActionSheet fail', err)
                    }
                });

                break;
        }
    });
};
