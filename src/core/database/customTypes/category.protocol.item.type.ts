import * as mongoose from 'mongoose' 

import { safetyValidationType } from './safety.validation.type'

const categoryProtocolItemType = new mongoose.Schema({
    idCategoryItem: {type: mongoose.Schema.Types.ObjectId, ref: 'InspectionCategoryItem', required: true},
    safetyValidation: [ safetyValidationType ],
    value: Number
},{ _id: false})

export { categoryProtocolItemType }