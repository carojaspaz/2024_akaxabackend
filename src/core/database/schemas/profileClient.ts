import * as Mongoose from "mongoose";

import { translate } from '../../localization';
import { MongoMessages } from '../../constants'
import { ProfileBase } from './profileBase'
import { addressType } from '../customTypes'


const ProfileClientSchema = new Mongoose.Schema({    
    address: addressType,
    secondaryAddress: addressType 
}, { versionKey: false })

ProfileClientSchema.pre('save', async function(done) {
    const profile = this
    if(profile.isNew){
        await ProfileBase.findOne({'email': profile.get('email')}, (err: any, profile: any) => {
            if(err){
                done(err)
            } if(profile){
                profile.invalidate('email', translate('uniqueFiled', 'schema', ['email']))            
                done(new Error(translate('uniqueFiled', 'schema', ['email'])))
            }
        })   
    }
    done()
})

ProfileClientSchema.methods.CreateClientProfile = async function(raw: any) {
    const profile = new ProfileClient(raw);    
    await profile.save();      
    return profile
}

ProfileClientSchema.methods.UpdateClientProfile = async function(id: string, raw: any): Promise<any> {
    const profile = await ProfileBase.findById(id)    
    if(raw.firstName) profile.set('firstName', raw.firstName)
    if(raw.lastName)  profile.set('lastName', raw.lastName)
    if(raw.phones) profile.set('phones', raw.phones)
    profile.set('lastUpdate', Date.now())
    await profile.save()
    return profile
}

ProfileClientSchema.methods.AddUpdateAddress = async function(id: string, mainAddress: boolean, raw: any): Promise<any> {
    const profile = await ProfileClient.findById(id)        
    if(mainAddress){
        profile.set('mainAddress', raw)
    } else {
        profile.set('secondaryAddress', raw)
    }
    profile.set('lastUpdate', Date.now())
    await profile.save()
    return profile
}

const ProfileClient = ProfileBase.discriminator(MongoMessages.profileDiscriminator.client, ProfileClientSchema)

export { ProfileClient };