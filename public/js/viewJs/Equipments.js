var flickity = null
$(document).ready(() => {
    $('.ddlMainPartitions').click(function (e) {
        e.preventDefault()
        $('#divCarousel').remove()
        fnResetModifyInput()
        $('div[aria-labelledby="ddlSubPartitions"]').empty()
        $('#choosenSubPartition').text('')
        $('#choosenPartition').text($(this).attr('data-name'))
        $.ajax({
            url: '/GetSubPartitions?p=' + $(this).attr('data-name'),
            type: 'GET'
        }).done((result) => {
            if (result.code === 1) {
                var eles = result.data
                $.each(eles, (idx, value) => {
                    var ele = value.subPartitions
                    var a = $('<a/>', {
                        class: 'dropdown-item ddlSubPartitions',
                        href: '#',
                        'data-groupSn': ele.groupSn,
                        'text': ele.groupName
                    })
                    $('div[aria-labelledby="ddlSubPartitions"]').append(a)
                })
                InitializeDdlFunction()
            }
        })
    })
    $('#aModify').click(function(e){
        e.preventDefault()
        var data={
            _id:$('input[name="eqId_Modify"]').val(),
            name:$('input[name="eqName_Modify"]').val(),
            picUrl:$('input[name="eqUrl_Modify"]').val(),
            status:$('select[name="eqStatus_Modify"]').val()
        }
        
        if(confirm(`確定修改 ${data.name} ?`)){
            $.ajax({
                url:'/ModifyEquipment',
                type:'POST',
                data:data
            }).done((result)=>{
                if(result.code===1){
                    alert('修改成功')
                    GetEquipments()
                }else{
                    alert('伺服器忙碌中')
                }
            })
        }
    })
    $('#aDelete').click(function(e){
        e.preventDefault()
        var name=$('input[name="eqName_Modify"]').val()
        if(confirm(`確定刪除 ${name} ?`)){
            var pid=$('input[name="eqId_Modify"]').val()
            $.ajax({
                url:'/DeleteEquipment',
                type:'DELETE',
                data:{pid:pid}
            }).done((result)=>{
                if(result.code===1){
                    alert('刪除成功')
                    GetEquipments()
                }else{
                    alert('伺服器忙碌中')
                }
            })
        }
    })
})
var InitializeDdlFunction = () => {
    $('.ddlSubPartitions').click(function (e) {        
        $('#choosenSubPartition').text($(this).text())
        $('.ddlSubPartitions').removeClass('selectedClass')
        $(this).addClass('selectedClass')
        GetEquipments()
    })
}
var GetEquipments = () => {
    fnResetModifyInput()
    $('#divCarousel').remove()
    $.ajax({
        url: '/GetEquipments?g=' + $('.selectedClass').attr('data-groupSn'),
        type: 'GET'
    }).done((result) => {
        if (result.code === 1) {
            var equipments = result.data[0].equipments
            if (equipments.length > 0) {
                var divCarousel = $('<div>', {
                    id: 'divCarousel',
                    class: 'main-carousel',
                })
                $.each(equipments, (idx, value) => {
                    var newDiv = $('<div>', {
                        'data-eqid': value._id,
                        'data-equipName': value.name,
                        'data-url': value.picUrl,
                        'data-status': value.status,
                        class: 'carousel-cell'
                    })
                    var img = $('<img>', {
                        src: value.picUrl
                    })
                    $(newDiv).append(img)
                    $(newDiv).appendTo(divCarousel);
                })
                $('#divCindition').after(divCarousel)
                flickity = $('#divCarousel').flickity({
                    // options
                    cellAlign: 'left',
                    contain: true,
                    imagesLoaded: true,
                    pageDots: false,
                    on: {
                        change: () => {
                            fnBindData()
                        }
                    }
                }).data('flickity')
                $('#pButtons_Modify').show()
                fnBindData()
            }
        }
    })
}
var fnBindData = () => {
    var equipment = $(flickity.selectedElement)    
    $('input[name="eqId_Modify"]').val(equipment.attr('data-eqid'))
    $('input[name="eqName_Modify"]').val(equipment.attr('data-equipName'))
    $('input[name="eqUrl_Modify"]').val(equipment.attr('data-url'))
    $('select[name="eqStatus_Modify"]').val(equipment.attr('data-status'))    
}
var fnResetModifyInput=()=>{
    $('#divModify input').val('')
    $('select[name="eqStatus_Modify"]').val('1')
    $('#pButtons_Modify').hide()
}