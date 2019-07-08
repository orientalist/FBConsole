exports.apiResult=(code,msg,data)=>{
    var model={
        code:code,
        msg:msg,
        data:data
    }
    return model
}