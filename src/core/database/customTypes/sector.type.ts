import * as mongoose from 'mongoose' 

const sectorType = new mongoose.Schema({    
    code: {type: String},
    name: {type: String}
},{ _id: false})

export { sectorType }