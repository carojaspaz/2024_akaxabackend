import * as Mongoose from "mongoose";

import { translate } from '../../localization';
import { MongoMessages } from '../../constants'
import { ProfileBase } from './profileBase'
import { addressType, CIIUType } from '../customTypes'


const ProfileOperatorSchema = new Mongoose.Schema({    
    abstract: {
        type: String,
        default: '',
        required: false,
        maxlength: 500
    },
    address: addressType,
    sectors: [CIIUType],
    profileType: {                
        audit: Boolean,        
        consultancy: Boolean,        
        teaching: Boolean,        
    },    
    approved: {
        type: Boolean,
        default: false
    }
}, { versionKey: false })

ProfileOperatorSchema.post('save', function(err: any, doc: any, next: any) {
    if(err.name === "MongoServerError" && err.code === 11000) {
        next(new Error(translate('uniqueFiled', 'schema', ['email'])))
    } else {
        next()
    }
})

ProfileOperatorSchema.methods.CreateOperatorProfile = async function(raw: any) {
    const profile = new ProfileOperator(raw);    
    await profile.save();      
    return profile
}

ProfileOperatorSchema.methods.UpdateOperatorProfile = async function(id: string, raw: any): Promise<any> {
    const filter = { '_id': id }
    raw.lastUpdate = Date.now()    
    let profile = await ProfileOperator.findOneAndUpdate(filter, raw)
    return profile._id
}

ProfileOperatorSchema.methods.AddUpdateAddress = async function(id: string, mainAddress: boolean, raw: any): Promise<any> {
    const profile = await ProfileOperator.findById(id)        
    if(mainAddress){
        profile.set('address', raw)
    } else {
        profile.set('secondaryAddress', raw)
    }    
    profile.set('lastUpdate', Date.now())
    await profile.save()
    return profile
}

ProfileOperatorSchema.methods.toggleApproved = async function(id: string): Promise<any>{    
    const profile = await ProfileOperator.findById(id)           
    profile.set('approved', !profile.get('approved'))
    profile.set('lastUpdate', Date.now())
    await profile.save()
    return profile._id
}


const ProfileOperator = ProfileBase.discriminator(MongoMessages.profileDiscriminator.operator, ProfileOperatorSchema)

export { ProfileOperator };