var conn=require('../db/connection')
var bl=require('./mainPartitionsBL')

bl.GetMainPartitions(conn,
    (partitions)=>{
        console.log(partitions)
    },
    (err)=>{
        console.log(err)
    })