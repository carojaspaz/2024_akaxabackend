import * as Mongoose from "mongoose";
import { translate } from '../../localization';

const keyValueSchema = new Mongoose.Schema({    
    key: {
        type: String,
        required: [true, translate('requiredField' , 'schema' , ['key'])],
    },
    value: {
        type: String,
        required: [true, translate('requiredField' , 'schema' , ['value'])],
    },  
    isProd:{
        type: Boolean,
        default: false
    },
    lastUpdate: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false, collection: 'keyvalue' });

keyValueSchema.methods.SetKey = async function(raw: any) : Promise<any> {
    const keyValue = new KeyValue(raw);    
    await keyValue.save();      
    return keyValue._id
}

keyValueSchema.methods.UpdateKey = async function(raw: any) : Promise<any> {
    const filter = { 'key': raw.key }
    raw.lastUpdate = Date.now()
    let keyValue = await KeyValue.findOneAndUpdate(filter, raw)
    return keyValue._id
}

const KeyValue = Mongoose.model('KeyValue', keyValueSchema)
export { KeyValue }