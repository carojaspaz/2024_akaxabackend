import * as Mongoose from "mongoose";

import { translate } from '../../localization';

const riskTypesSchema = new Mongoose.Schema({    
    risk:{
        type: String,
        required: [true, translate('requiredField' , 'schema' , ['risk'])],
    },
    code:{
        type: String,
        required: true
    },        
    level:{
        type: String,
        default: true
    }
}, { versionKey: false, collection: 'risktypes' });

const RiskTypes = Mongoose.model('RiskTypes', riskTypesSchema)
export { RiskTypes }