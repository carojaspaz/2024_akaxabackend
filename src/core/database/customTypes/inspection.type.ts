import * as mongoose from 'mongoose' 

import { OptionType } from './option.type'

const InspectionType = new mongoose.Schema({    
    title: {type: String},
    desc: {type: String},
    value: {type: Number},
    options: [OptionType]
},{ _id: false})

export { InspectionType }