import * as mongoose from 'mongoose' 

import { translate } from '../../localization';
import { studyLevelTypes, studyLevelTypesArray,  } from '../../enums'

const studyType = new mongoose.Schema({
    institution: {type: String},    
    level: {
        type: String,
        enum: {
            values: Object.values(studyLevelTypes),
            name: 'StudyType',
            message: translate('studyType','profile', studyLevelTypesArray)
        }
    },
    grade: {type: String},
    graduateYear: {type: Number},
    evidence: {type: String, default: ''}
},{ versionKey: false })

Object.assign(studyType.statics, { studyType });


export { studyType }