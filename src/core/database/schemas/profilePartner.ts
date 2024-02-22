import * as Mongoose from "mongoose";

import { MongoMessages } from '../../constants'
import { ProfileBase } from './profileBase'
import { addressType, studyType, experienceType } from '../customTypes'

const ProfilePartnerSchema = new Mongoose.Schema({
    abstract: {
        type: String,
        default: '',
        required: false,
        maxlength: 500
    },   
    address: addressType,
    studies: [studyType],
    experience: [experienceType],    
    approved: {
        type: Boolean,
        default: false
    },
    parentOperator: {
        type: Mongoose.Schema.Types.ObjectId, ref: 'Profile', required: false        
    }
}, {versionKey: false});

ProfilePartnerSchema.methods.CreatePartnerProfile = async function(raw: any) {
    const profile = new ProfilePartner(raw);    
    await profile.save();      
    return profile
}

ProfilePartnerSchema.methods.UpdatePartnerProfile = async function(id: string, raw: any): Promise<any> {
    const filter = { '_id': id }
    raw.lastUpdate = Date.now()    
    let profile = await ProfilePartner.findOneAndUpdate(filter, raw)
    return profile._id
}

ProfilePartnerSchema.methods.AddStudyEvidence = async function(id: string, raw: any): Promise<any>{
    const profile = await ProfilePartner.findById(id)  
    profile.set('studies', raw)
    await profile.save()
    return profile
}

ProfilePartnerSchema.methods.RemoveStudyEvidence = async function(id: string, idEvidence: string): Promise<any>{
    const filter = { '_id': id}
    const profile = await ProfilePartner.updateOne(filter,
        { $pull: { 'studies': { '_id': idEvidence } }})
    return profile
}

ProfilePartnerSchema.methods.AddExperienceEvidence = async function(id: string, raw: any): Promise<any>{
    const filter = { '_id': id}       
    const profile = await ProfilePartner.updateOne(filter,
        { $push: { 'experience': raw }})
    return profile
}

ProfilePartnerSchema.methods.RemoveExperinceEvidence = async function(id: string, idEvidence: string): Promise<any>{
    const filter = { '_id': id}
    const profile = await ProfilePartner.updateOne(filter,
        { $pull: { 'experience': { '_id': idEvidence } }})
    return profile
}

ProfilePartnerSchema.methods.toggleApproved = async function(id: string): Promise<any>{    
    const profile = await ProfilePartner.findById(id)           
    profile.set('approved', !profile.get('approved'))
    profile.set('lastUpdate', Date.now())
    await profile.save()
    return profile._id
}

const ProfilePartner = ProfileBase.discriminator(MongoMessages.profileDiscriminator.partner, ProfilePartnerSchema)

export { ProfilePartner }