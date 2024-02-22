import * as Mongoose from "mongoose";
import validator from 'validator';

import { translate } from '../../localization';
import { MongoMessages } from '../../constants'
import { phoneType, documentType } from '../customTypes'

const profileBaseSchema = new Mongoose.Schema({    
    firstName:{
        type: String,
        required: [true, translate('requiredField' , 'schema' , ['firstName'])],
    },
    lastName:{
        type: String,
        required: [true, translate('requiredField' , 'schema' , ['lastName'])],
    },
    identification: documentType,
    phones: [ phoneType ],    
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value: string){
                return validator.isEmail(value);
            },
            message: (props: any) => translate('invalidEmail','user',[props.value])
        }
    },    
    profilePicture: {
        type: String,
        default: MongoMessages.resources.defaultPic,
        required: false
    },
    creationDate: { 
        type: Date,
        default: Date.now()
    },
    lastUpdate: {
        type: Date,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    },    
    mainUser: {
        type: Mongoose.Schema.Types.ObjectId, ref: 'User', required: false        
    }
}, { versionKey: false, discriminatorKey: MongoMessages.profileDiscriminator.key });

profileBaseSchema.methods.CreateAdminProfile = async function(raw: any): Promise<any> {
    const profile = new ProfileBase(raw);    
    await profile.save()
    return profile
}

profileBaseSchema.methods.UpdateAdminProfile = async function(id: string, raw: any): Promise<any> {
    const profile = await ProfileBase.findById(id)    
    if(raw.firstName) profile.set('firstName', raw.firstName)
    if(raw.lastName)  profile.set('lastName', raw.lastName)
    if(raw.phones) profile.set('phones', raw.phones)    
    profile.set('lastUpdate', Date.now())
    await profile.save()
    return profile
}

profileBaseSchema.methods.UpdateClientProfile = async function(id: string, raw: any): Promise<any> {
    const profile = await ProfileBase.findById(id)    
    if(raw.firstName) profile.set('firstName', raw.firstName)
    if(raw.lastName)  profile.set('lastName', raw.lastName)
    if(raw.phones) profile.set('phones', raw.phones)    
    profile.set('lastUpdate', Date.now())
    await profile.save()
    return profile
}

profileBaseSchema.methods.UpdateProfilePicture = async function(id: string, url: string): Promise<any> {
    const profile = await ProfileBase.findById(id)
    profile.set('profilePicture', url)
    profile.set('lastUpdate', Date.now())
    profile.save()
    return id
}

profileBaseSchema.methods.ToggleActive = async function(id: string): Promise<any> {
    const profile = await ProfileBase.findById(id)        
    profile.set('isActive', !profile.get('isActive'))
    profile.set('lastUpdate', Date.now())
    await profile.save()
    return profile
}

const ProfileBase = Mongoose.model('Profile', profileBaseSchema);
export { ProfileBase };