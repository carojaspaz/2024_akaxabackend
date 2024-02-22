import * as mongoose from 'mongoose' 

import { translate } from '../../localization';
import { scheduleTypes, scheduleTypeNamesArray} from '../../enums'

const planActionItemType = new mongoose.Schema({    
    spot: {type: String},
    value: {type: Number},
    subjectItem: {type: String},
    inspectionItem: {type: String},
    finding: {type: String},
    reponsable: {type: String, default: ''},
    action: {type: String, default: ''},
    date: {type: Date, default: null},
    status: {
        type: String,
        enum: {
            values: Object.values(scheduleTypes),
            name: 'AuditStatus',
            message: translate('statusAudit','protocol', scheduleTypeNamesArray)
        }
    },
    acepted: {type: Boolean, default: false},
    aceptedDate: {type: Date, default: null}
},{ _id: false})

export { planActionItemType }