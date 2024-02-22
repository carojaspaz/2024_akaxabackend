import * as mongoose from 'mongoose' 

const selectedType = new mongoose.Schema({    
    type: {type: String},
    isSelected: {type: Boolean}
},{ _id: false})

export { selectedType }