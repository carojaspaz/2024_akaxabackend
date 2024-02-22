import * as mongoose from 'mongoose' 

import { translate } from '../../localization';
import { documentTypes, documentTypesArray,  } from '../../enums'

const documentType = new mongoose.Schema({
    number: {type: String},
    type: {
        type: String,
        enum: {
            values: Object.values(documentTypes),    
            name: "DocumentType"        ,
            message: translate('documentType','profile', documentTypesArray)
        }
    }
},{ _id: false})

Object.assign(documentType.statics, { documentTypes });


export { documentType }