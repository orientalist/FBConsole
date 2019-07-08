var request=require('request')
var returnModel=require('../models/returnModel')

const url='https://graph.facebook.com/v3.3/me/messenger_profile'

var ACCESS_TOKEN=''

exports.InitializeFunctions=(access_token)=>{
    ACCESS_TOKEN=access_token
}

exports.GetAccessToken=()=>{
    return ACCESS_TOKEN
}

exports.CreatePersistMenu=(persistMenuModel,callback)=>{
    callPostPromise(persistMenuModel,callback)
}

exports.ModifyGetStartedButtons=(getStartedButtomModel,callback)=>{
    callPostPromise(getStartedButtomModel,callback)
}

exports.ModifyWelcomePage=(welcomePageModel,callback)=>{
    callPostPromise(welcomePageModel,callback)
}

exports.ModifyAccountLinkUel=(acclinkurl,callback)=>{
    callPostPromise(acclinkurl,callback)
}

var callPostPromise=(model,callback)=>{
    var promise=new Promise((resolved,rejected)=>{
        callFbApis('POST',JSON.stringify(model),resolved,rejected)
    })

    promise.then((result)=>{
        callback(result)
    },(err)=>{
        callback(err)
    })
}

var callFbApis=(method,json,resolved,rejected)=>{
    request({
        'uri':url,
        'qs':{
            'access_token':ACCESS_TOKEN
        },
        'headers':{
            'Content-Type':'application/json'
        },
        'method':method,
        'body':json
    },(err,res,body)=>{
        var result=returnModel.apiResult()
        if(err){
            result.code=0
            result.data=err
            rejected(result)
        }else{
            result.code=1
            result.msg=res
            result.data=body
            resolved(result)
        }
    })    
}