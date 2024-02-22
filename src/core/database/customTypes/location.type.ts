import * as mongoose from 'mongoose'

const locationType = new mongoose.Schema({
    id: { type: Number},
    lat: { type: Number},
    lng: { type: Number},
    formattedAddress: { type: String},
    zipCode: { type: String},
    city: { type: String},
    state_long: { type: String},
    state_short: { type: String},
    country_long: { type: String},
    country_short: { type: String}
},{ _id: false})

export { locationType }