var mongoose = require('mongoose')

mongoose.connect(require('./config').ConnStr('Record'), { userNewUrlParser: true })

var Schema = mongoose.Schema

exports.Partitions = mongoose.model('Partitions',
    new Schema({
        mainPartitions: [
            {
                name: {
                    type: String,
                    required: true
                },
                status: {
                    type: Number,
                    required: true,
                    enum: [0, 1, 2]
                }
            }
        ]
    })
)

exports.SubPartitions = mongoose.model('Subpartitions',
    new Schema({
        subPartitions: [
            {
                belongTo: {
                    type: String,
                    required: true
                },
                groupSn: {
                    type: Number,
                    required: true
                },
                groupName: {
                    type: String,
                    required: true
                },
                groupStatus: {
                    type: Number,
                    required: true
                }
            }
        ]
    })
)

exports.Equipments = mongoose.model('Equipments',
    new Schema({
        belongTo:{
            type:String,
            required:true
        },
        groupSn:{
            type:Number,
            required:true
        },
        groupName:{
            type:String,
            required:true
        },
        groupStatus:{
            type:Number,
            required:true
        },
        equipments:[
            {
                name:{
                    type:String,
                    required:true
                },
                picUrl:{
                    type:String,
                    required:true
                },
                status:{
                    type:Number,
                    required:true
                }
            }
        ]
    })
)