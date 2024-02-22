import * as mongoose from 'mongoose' 

const optionAuditType = new mongoose.Schema({    
    type: {type: String},
    code: {type: String},
    value: {type: Number}
},{ _id: false})

export { optionAuditType }