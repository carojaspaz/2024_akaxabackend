import * as Mongoose from "mongoose";

import { translate } from '../../localization';

const typesListSchema = new Mongoose.Schema({    
    type:{
        type: String,
        required: [true, translate('requiredField' , 'schema' , ['risk'])],
    },
    desc:{
        type: String,
        required: false        
    },        
}, { versionKey: false, collection: 'typeslist' });

const TypesList = Mongoose.model('TypesList', typesListSchema)
export { TypesList }