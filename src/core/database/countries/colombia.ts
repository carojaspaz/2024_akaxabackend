import * as mongoose from "mongoose";

const colombiaSchema = new mongoose.Schema({    
    state:{
        type: String,
        maxLength: 2
    },
    municipality:{
        type: String,
        maxLength: 5
    },
    populateCenter:{
        type: String,
        maxLength: 8
    },
    stateName:{
        type: String        
    },
    municipalityName:{
        type: String        
    },
    populatedCenterName:{
        type: String        
    },
    longitude:{
        type: String        
    },
    latitude:{
        type: String        
    },
    
}, { versionKey: false, collection: 'colombia' });


const Colombia = mongoose.model('Colombia', colombiaSchema);
export { Colombia };