import * as Mongoose from "mongoose";

import { translate } from '../../localization';

const reputationalImpactSchema = new Mongoose.Schema({    
    impact:{
        type: String,
        required: [true, translate('requiredField' , 'schema' , ['impact'])],
    },
    level:{
        type: Number,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    items: [String]
}, { versionKey: false, collection: 'reputationalimpacts' });

const ReputationalImpact = Mongoose.model('ReputationalImpact', reputationalImpactSchema)
export { ReputationalImpact }