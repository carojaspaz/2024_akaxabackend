import * as Mongoose from "mongoose";
import { translate } from '../../localization';
import { evaluationTypes, evaluationTypesArray } from '../../enums'
import { async } from "rxjs/internal/scheduler/async";

const inspectionCategorySchema = new Mongoose.Schema({    
    sector: {
        type: String,
        required: true        
    },
    division: {
        type: String,
        required: true,
    },
    subdivision: {
        type: String,
        required: true,
    },         
    activity: {
        type: String,
        required: true,
    },                  
    subject: {
       type: String,
       required: true,
    },
    evaluationType: {
        type: String,
        required: true,
        enum: {
            values: Object.values(evaluationTypes),
            name: 'evaluationType',
            message: translate('evaluationType','inspectionCategory', evaluationTypesArray)
        }
    },
    description: {
        type: String,
    },
    noItems: {
        type: Boolean,
        default: false
    },
    activitiesVerify: [{
        type: String
    }]
}, { versionKey: false });

Object.assign(inspectionCategorySchema.statics, { evaluationTypes });

inspectionCategorySchema.methods.CreateCategory = async function(raw: any) : Promise<any> {
    const category = new InspectionCategory(raw);    
    await category.save();      
    return category._id
}

inspectionCategorySchema.methods.UpdateCategory = async function(id: string, raw: any) : Promise<any> {
    const inspection = await InspectionCategory.findById(id)    
    inspection.set('subject', raw.subject)
    inspection.set('description', raw.description)
    inspection.set('lastUpdate', Date.now())
    await inspection.save()
    return inspection
}

const InspectionCategory = Mongoose.model('InspectionCategory', inspectionCategorySchema);
export { InspectionCategory };