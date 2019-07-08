exports.call_to_actions=(type,title,payload,url,webview_height_ratio)=>{
    var model={
        type:type,
        title:title,
    }
    if(type==='postback'){
        model.payload=payload
    }
    else if(type==='web_url'){
        model.url=url
        model.webview_height_ratio=webview_height_ratio
    }
    return model
}

exports.PersistMenu=(locale,composer_input_disabled,call_to_actions)=>{
    var model=
    {
        persistent_menu: [
            {
                locale:locale,
                composer_input_disabled:composer_input_disabled,
                call_to_actions:[]
            }
        ]
    }
    call_to_actions.forEach(element => {
        model.persistent_menu[0].call_to_actions.push(element)
    });
    return model
}