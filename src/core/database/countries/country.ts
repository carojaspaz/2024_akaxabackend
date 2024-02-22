import * as mongoose from "mongoose";

const countrySchema = new mongoose.Schema({    
    name:{
        type: String
    },
    code:{
        type: String,
        maxLength: 3
    },
    active:{
        type: Boolean,
        default: false        
    }    
}, { versionKey: false, collection: 'countries' });


const Country = mongoose.model('Country', countrySchema);
export { Country };