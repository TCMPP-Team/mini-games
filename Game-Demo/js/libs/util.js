function switchButtonState(arr) {
    while (arr.length) {
        let item = arr.shift();
        item.button.isTouchable(item.boolead);
        item.button.turnColors({ border: { color: item.color } });
        item.button.children[0].children[0].turnColors(item.color);
    }
}

module.exports = {
    switchButtonState
}