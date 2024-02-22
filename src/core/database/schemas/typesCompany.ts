import * as Mongoose from "mongoose";

import { translate } from '../../localization';

const typeCompanySchema = new Mongoose.Schema({    
    type:{
        type: String,
        required: [true, translate('requiredField' , 'schema' , ['type'])],
    },
    desc:{
        type: String,
        required: false        
    },        
    riskLevel: {
        type: Mongoose.Schema.Types.ObjectId, ref: 'RiskTypes', required: true        
    }
}, { versionKey: false, collection: 'typescompany' });

typeCompanySchema.methods.CreateType = async function(raw: any): Promise<any> {
    const type = new TypeCompany(raw)
    await type.save()
    return type._id
}

typeCompanySchema.methods.UpdateType = async function(id: any, raw: any): Promise<any> {
    const type = await TypeCompany.findById(id)
    type.set('type', raw.type)
    type.set('desc', raw.desc)
    type.set('riskLevel', raw.riskLevel)
    await type.save()
    return type._id
}

const TypeCompany = Mongoose.model('TypeCompany', typeCompanySchema)
export { TypeCompany }