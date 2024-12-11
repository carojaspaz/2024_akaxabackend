import * as mongoose from 'mongoose'

import { translate } from '../../localization';
import { socialNetworkTypes, socialNetworkTypesArrays, } from '../../enums'

const socialNetworkType = new mongoose.Schema({
    user: { type: String },
    network: {
        type: String,
        enum: {
            values: Object.values(socialNetworkTypes),
            name: 'PhoneType',
            message: translate('socialNetworkTypes', 'profile', socialNetworkTypesArrays)
        }
    }
}, { _id: false })

Object.assign(socialNetworkType.statics, { socialNetworkTypes });


export { socialNetworkType }