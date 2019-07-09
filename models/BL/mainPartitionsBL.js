exports.GetMainPartitions = (conn, callback, fail) => {
    var promise = conn.Partitions.aggregate([
        {
            $unwind: '$mainPartitions'
        }, {
            $match: {
                'mainPartitions.status': 1
            }
        }
    ])

    promise.then(
        (partitions) => {
            callback(partitions)
        },
        (err) => {
            fail(err)
        }
    )
}

exports.GetSubPartitions = (conn, subPartitionName, callback, fail) => {
    var promise = conn.SubPartitions.aggregate([
        {
            $unwind: '$subPartitions'

        }, {
            $match: {
                'subPartitions.belongTo': subPartitionName,
                'subPartitions.groupStatus': 1
            }
        }
    ])
    promise.then(
        (subPartitions) => {
            callback(subPartitions)
        },
        (err) => {
            fail(err)
        }
    )
}

exports.GetEquipments = (conn, groupSn, callback, fail) => {

    var promise = conn.Equipments.aggregate(
        [
            { $match: { groupSn: parseInt(groupSn) } },
            {
                $project: {
                    equipments: {
                        $filter: {
                            input: '$equipments',
                            as: 'equipments',
                            cond: { $ne: ['$$equipments.status', 9] }
                        }
                    }
                }
            }
        ]
    )
    promise.then(
        (eqs) => {
            //console.log(eqs)
            callback(eqs)
        },
        (err) => {
            fail(err)
        }

    )
}

exports.DeleteEquipment=(conn,equipmentId,callback,fail)=>{
    var promise=conn.Equipments.update(
        {
            'equipments._id':equipmentId
        },
        {
            $set:{
                'equipments.$.status':9
            }
        }
    )
    promise.then(
        (result)=>{
            callback('ok')
        },
        (err)=>{
            fail(err)
        }
    )
}

exports.ModifyEquipment=(conn,equipment,callback,fail)=>{
    var promise=conn.Equipments.update(
        {
            'equipments._id':equipment._id
        },
        {
            $set:{
                'equipments.$.name':equipment.name,
                'equipments.$.picUrl':equipment.picUrl,
                'equipments.$.status':parseInt(equipment.status)
            }
        }
    )

    promise.then(
        (result)=>{
            callback('ok')
        },
        (err)=>{
            fail(err)
        }
    )
}

exports.CreateEquipment=(conn,equipment,callback,fail)=>{
    var promise=conn.Equipments.update(
        {
            belongTo:equipment.belongTo,
            groupSn:equipment.groupSn,
            groupName:equipment.groupName,
            groupStatus:1
        },
        {
            $push:{
                'equipments':{
                    name:equipment.name,
                    picUrl:equipment.picUrl,
                    status:equipment.status
                }
            }
        },
        {upsert:true}
    )

    promise.then(
        (result)=>{
            callback('ok')
        },
        (err)=>{
            fail(err)
        }
    )
}