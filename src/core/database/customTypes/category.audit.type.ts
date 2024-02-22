import * as mongoose from 'mongoose' 

import {inspectionSumaryType} from './inspection.sumary.type'
import { itemCategoryAuditType } from './item.category.audit'

const categoryAuditType = new mongoose.Schema({
    id:{ type: mongoose.Schema.Types.ObjectId, ref: 'InspectionCategory', required: true },
    name: String,
    totalCategory: Number,
    totalAreasAvailables: Number,
    finding: String,
    levelComplete: String,
    percent: String,
    minCagetory: Number,
    maxCategory: Number,
    factor: Number,    
    evaluationType: String,
    inspectionSumary: [inspectionSumaryType],
    items: [ itemCategoryAuditType ],
    valid: {type: Boolean, default: false}    
},{ _id: false})

export { categoryAuditType }