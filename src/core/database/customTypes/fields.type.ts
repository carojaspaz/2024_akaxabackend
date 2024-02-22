import * as mongoose from 'mongoose' 

const fieldType = new mongoose.Schema({
    id: {type: Number},
    rating: {type: Number},
    ratingFieldName: {type: String}
},{ _id: false})

export { fieldType }