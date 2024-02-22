import * as mongoose from 'mongoose'

const imageType = new mongoose.Schema({
    id: { type: Number},
    url: { type: String},
    thumb_url: { type: String}
},{ _id: false})

export { imageType }