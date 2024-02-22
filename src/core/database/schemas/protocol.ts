import * as Mongoose from "mongoose";

import { CIIUType, categoryProtocolType, selectedType } from '../customTypes'

const protocolSchema = new Mongoose.Schema({    
    name: {
        type: String,
        required: true        
    },
    typesList: [{type: Mongoose.Schema.Types.ObjectId, ref: 'TypesList', required: false}],
    CIIU: {
        type: CIIUType,
        required: true,
    },  
    valued: {
        type: Boolean,
        default: false        
    },       
    categories: [ categoryProtocolType ],
    lastUpdate: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

protocolSchema.methods.CreateProtocol = async function(raw: any) : Promise<any> {
    const protocol = new Protocol(raw);    
    await protocol.save();      
    return protocol._id
}

protocolSchema.methods.UpdateProtocol = async function(id: String, raw: any) : Promise<any>{
    const filter = { '_id': id }
    raw.lastUpdate = Date.now()
    let protocol = await Protocol.findOneAndUpdate(filter, raw)
    return protocol._id
} 

const Protocol = Mongoose.model('Protocol', protocolSchema);
export { Protocol };