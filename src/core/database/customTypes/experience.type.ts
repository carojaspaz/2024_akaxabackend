import * as mongoose from 'mongoose' 

const experienceType = new mongoose.Schema({
    enterprise: {type: String},
    position: {type: String},
    description: {type: String, maxLength: 500},
    year: {type: Number},
    evidence: {type: String, default: ''}
},{ versionKey: false })

export { experienceType }