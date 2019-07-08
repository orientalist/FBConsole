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
                            cond: { $eq: ['$$equipments.status', 1] }
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