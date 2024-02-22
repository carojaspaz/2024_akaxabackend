import * as mongoose from 'mongoose' 

const safetyValidationType = new mongoose.Schema({    
    id: Number,
    type: {type: String},
    isSelected: {type: Boolean},
    value: Number
},{ _id: false})

export { safetyValidationType }