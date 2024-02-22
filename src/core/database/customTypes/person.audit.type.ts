import * as mongoose from 'mongoose' 

const personAuditType = new mongoose.Schema({    
    name: {type: String},
    position: {type: String},
    initialMeeting: {type: Boolean},
    docReview: {type: Boolean},
    fieldEvaluation: {type: Boolean},
    finalMeeting: {type: Boolean},
},{ _id: false})

export { personAuditType }