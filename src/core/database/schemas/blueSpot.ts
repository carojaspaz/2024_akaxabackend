import * as Mongoose from "mongoose";
import { imageType, locationType, reviewType } from '../customTypes'

const blueSpotSchema = new Mongoose.Schema({    
    id: { 
        type: Number, 
        required: true
    },
    agentId: Number,
    title: {
        type: String,
        required: true
    },
    slug: String,
    content: String,
    status: String,
    price: Number,
    isNegotiable: Boolean,
    propertyType: String,
    condition: String,
    rating: Number,
    ratingCount: Number,
    contactNumber: String,
    amenities: [{
        id: {type: Number},
        wifiAvailability: {type: Boolean},
        amenityText: {type: String},
        slug: { type: String}        
    },
    {
        id: {type: Number},
        parkingAvailability: {type: Boolean},
        amenityText: {type: String},
        slug: { type: String}        
    },
    {
        id: {type: Number},
        poolAvailability: {type: Boolean},
        amenityText: {type: String},
        slug: { type: String}        
    },
    {
        id: {type: Number},
        airAvailability: {type: Boolean},
        amenityText: {type: String},
        slug: { type: String}        
    }],
    image: imageType,
    location: locationType,
    gallery: [imageType],
    reviews: [reviewType],
    createdAt: Date,
    updatedAt: Date
}, { versionKey: false });

const BlueSpot = Mongoose.model('BlueSpot', blueSpotSchema);
export { BlueSpot };