import * as mongoose from 'mongoose' 

const activityAuditType = new mongoose.Schema({    
    activity: {type: String},
    desc: {type: String}
},{ _id: false})

export { activityAuditType }