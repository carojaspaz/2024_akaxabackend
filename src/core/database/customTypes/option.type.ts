import * as mongoose from 'mongoose' 

const OptionType = new mongoose.Schema({    
    type: {type: String},
    value: {type: Number}
},{ _id: false})

export { OptionType }