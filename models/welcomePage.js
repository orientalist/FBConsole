exports.GetWelcomePage = (_default, zh_TW) => {
    var model = {
        greeting: [{
            locale: 'default',
            text: _default
        }, {
            locale: 'zh_TW',
            text: zh_TW
        }]
    }
    return model
}