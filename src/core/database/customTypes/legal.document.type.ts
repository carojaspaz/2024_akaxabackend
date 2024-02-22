import * as mongoose from 'mongoose' 

import { translate } from '../../localization';
import { legalDocumentTypes, legalDocumentTypesArray,  } from '../../enums'

const legalDocumentType = new mongoose.Schema({
    number: {type: String},
    type: {
        type: String,
        enum: {
            values: Object.values(legalDocumentTypes),    
            name: "DocumentType"        ,
            message: translate('documentType','profile', legalDocumentTypesArray)
        }
    }
},{ _id: false})

Object.assign(legalDocumentType.statics, { legalDocumentType });


export { legalDocumentType }