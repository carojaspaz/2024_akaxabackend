import * as mongoose from 'mongoose' 

import { optionAuditType } from './option.audit.type'

const inspectionItemCategoryType = new mongoose.Schema({    
    title: String,
    desc: String,
    value: Number,
    options: [optionAuditType]
},{ _id: false})

export { inspectionItemCategoryType }