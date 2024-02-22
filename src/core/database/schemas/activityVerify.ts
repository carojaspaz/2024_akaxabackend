import * as Mongoose from "mongoose";

import { translate } from '../../localization';

const activityVerifySchema = new Mongoose.Schema({    
    activity:{
        type: String,
        required: [true, translate('requiredField' , 'schema' , ['activity'])],
    },
    description:{
        type: String,
        required: false,
        unique: true      
    },        
    isActive: {
        type: Boolean,
        default: true
    }
}, { versionKey: false, collection: 'activitiesverify' });

activityVerifySchema.methods.CreateActivity = async(raw: any): Promise<any> => {
    const activity = new ActivityVerify(raw);    
    await activity.save();      
    return activity._id
}

activityVerifySchema.methods.ToggleActive = async function(id: string): Promise<any> {
    const activity = await ActivityVerify.findById(id)       
    activity.set('isActive', !activity.get('isActive'))    
    await activity.save()
    return activity._id
}

const ActivityVerify = Mongoose.model('ActivityVerify', activityVerifySchema)
export { ActivityVerify }