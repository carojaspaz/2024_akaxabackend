import * as Mongoose from "mongoose";

import { translate } from '../../localization';

const conditionRiskSchema = new Mongoose.Schema({    
    risk:{
        type: String,
        required: [true, translate('requiredField' , 'schema' , ['risk'])],
    },
    desc:{
        type: String,
        required: false        
    },        
}, { versionKey: false, collection: 'conditionsrisk' });

const ConditionRisk = Mongoose.model('ConditionRisk', conditionRiskSchema)
export { ConditionRisk }