import * as mongoose from 'mongoose'
import { imageType } from './image.type'
import { fieldType } from './fields.type'

const reviewType = new mongoose.Schema({
    reviewID: { type: Number},
    reviewTitle: { type: String},
    reviewText: {type: String},    
    reviewAuthorId: {type: String},
    reviewAuthorFirstName: {type: String},
    reviewAuthorLastName: {type: String},
    reviewAuthorEmail: {type: String},
    reviewAuthorPic: imageType,
    reviewDate: {type: Date},
    reviewFields: [ fieldType ]
},{ _id: false})

export { reviewType }