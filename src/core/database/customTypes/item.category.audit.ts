import * as mongoose from 'mongoose' 

import { inspectionItemCategoryType } from './inspection.item.category.type'

const itemCategoryAuditType = new mongoose.Schema({    
    id:{ type: mongoose.Schema.Types.ObjectId, ref: 'InspectionCategoryItem', required: true },
    inspectionItem: String,
    subjectItem: String,
    value: Number,
    risk: String,    
    codeRisk: String,
    finding: String,
    availabilityAreas: Number,
    inspections: [inspectionItemCategoryType]
},{ _id: false})

export { itemCategoryAuditType }