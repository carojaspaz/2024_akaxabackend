import * as mongoose from 'mongoose' 

const addressType = new mongoose.Schema({
    country: {
        type: String,
        required: true
    },
    firstPoliticalDivision: {
        type: String,
        required: true
    },
    secondPoliticalDivision: {
        type: String        
    },
    thirdPoliticalDivision: {
        type: String        
    },
    fourthPoliticalDivision: {
        type: String        
    },
    zipCode: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    }
},{ _id: false})



export { addressType }