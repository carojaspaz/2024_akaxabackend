import * as Mongoose from "mongoose";

import { selectedType } from '../customTypes/selected.type'

const inspectionCategoryItemSchema = new Mongoose.Schema({    
    inspectionCategory: {
        type: Mongoose.Schema.Types.ObjectId, ref: 'InspectionCategory', required: true        
    },
    item: {
        type: String,
        required: true        
    },
    subject: {
        type: String,
        required: true,
    },
    value: {
        type: Boolean,
        default: false
    },
    activities: [selectedType],         
    conditionRisk: {
        type: Mongoose.Schema.Types.ObjectId, ref: 'ConditionRisk', required: true        
    },
}, { versionKey: false });

inspectionCategoryItemSchema.methods.CreateCategoryItem = async function(raw: any) : Promise<any> {
    const item = new InspectionCategoryItem(raw);    
    await item.save();      
    return item._id
}

inspectionCategoryItemSchema.methods.UpdateCategoryItem = async function(id: string, raw: any) : Promise<any> {
    const inspection = await InspectionCategoryItem.findById(id)    
    inspection.set('subject', raw.subject)
    inspection.set('item', raw.item)
    inspection.set('lastUpdate', Date.now())
    await inspection.save()
    return inspection
}

const InspectionCategoryItem = Mongoose.model('InspectionCategoryItem', inspectionCategoryItemSchema);
export { InspectionCategoryItem };