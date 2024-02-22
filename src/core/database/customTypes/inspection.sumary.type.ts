import * as mongoose from 'mongoose' 

const inspectionSumaryType = new mongoose.Schema({    
    label: String,
    cont: Number
},{ _id: false})

export { inspectionSumaryType }