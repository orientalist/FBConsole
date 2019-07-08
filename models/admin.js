var adminModel={
    AdminName:'',
    AdminAvatar:''
}

exports.SetAdmin=(name,avatar)=>{
    adminModel.AdminName=name
    adminModel.AdminAvatar=avatar
}

exports.GetAdmin=()=>{
    return adminModel
}