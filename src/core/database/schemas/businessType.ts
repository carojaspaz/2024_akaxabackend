import * as Mongoose from "mongoose";

import { translate } from '../../localization';

const businessTypesSchema = new Mongoose.Schema({    
    bussines:{
        type: String,
        required: [true, translate('requiredField' , 'schema' , ['activity'])],
    },
    description:{
        type: String,
        required: false
    },        
    risk:{
        type: Mongoose.Schema.Types.ObjectId, ref: 'RiskType', required: true
    }
}, { versionKey: false, collection: 'bussinestypes' });

const BussinesType = Mongoose.model('bussinestype', businessTypesSchema)
export { BussinesType }