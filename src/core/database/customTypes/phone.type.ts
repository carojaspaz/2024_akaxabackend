import * as mongoose from 'mongoose' 

import { translate } from '../../localization';
import { phoneTypes, phoneTypesArray,  } from '../../enums'

const phoneType = new mongoose.Schema({
    number: {type: String},
    type: {
        type: String,
        enum: {
            values: Object.values(phoneTypes),
            name: 'PhoneType',
            message: translate('phoneType','profile', phoneTypesArray)
        }
    }
},{ _id: false})

Object.assign(phoneType.statics, { phoneTypes });


export { phoneType }