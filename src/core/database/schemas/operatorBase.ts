import * as Mongoose from "mongoose"
import validator from 'validator';

import { translate } from '../../localization';
import { MongoMessages } from '../../constants'
import { addressType, documentType, phoneType } from '../customTypes'

const operatorBaseSchema = new Mongoose.Schema({
    firstName:{
        type: String,
        required: [true, translate('requiredField' , 'schema' , ['firstName'])],
    },
    lastName:{
        type: String,
        required: [true, translate('requiredField' , 'schema' , ['lastName'])],
    },
    email: {
        type: String,
        required: [true, translate('requiredField' , 'schema' , ['email'])],
        unique: true,
        validate: {
            validator: function(value: string){
                return validator.isEmail(value);
            },
            message: (props: any) => translate('invalidEmail' , 'user' , [props.value])
        }
    },
    identification: documentType,
    abstract: {
        type: String,
        default: '',
        required: false,
        maxlength: 500
    },
    address: addressType,
    phones: [ phoneType ],  
    profileType: {                
        audit: Boolean,        
        consultancy: Boolean,        
        teaching: Boolean,        
    },  
    profilePicture: {
        type: String,
        default: MongoMessages.resources.defaultPic,
        required: false
    },  
    approved: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },  
    operatorProfile: {
        type: Mongoose.Schema.Types.ObjectId, ref: 'Profile', required: false        
    },
    partnerProfiles: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
    creationDate: { 
        type: Date,
        default: Date.now()
    },
    lastUpdate: {
        type: Date,
        default: null
    }
}, { versionKey: false, discriminatorKey: MongoMessages.operatorDiscriminator.key })


operatorBaseSchema.post('save', function(err: any, doc: any, next: any) {
    if(err.name === "MongoServerError" && err.code === 11000) {
        next(new Error(translate('uniqueFiled', 'schema', ['email'])))
    } else {
        next()
    }
})

operatorBaseSchema.methods.UpdateOperatorPicture = async function(id: string, url: string): Promise<any> {
    const operator = await OperatorBase.findById(id)
    operator.set('profilePicture', url)
    operator.set('lastUpdate', Date.now())
    operator.save()
    return id
}

operatorBaseSchema.methods.AddUpdateAddress = async function(id: string, raw: any): Promise<any> {
    const operator = await OperatorBase.findById(id) 
    operator.set('address', raw)
    operator.set('lastUpdate', Date.now())
    await operator.save()
    return operator
}

operatorBaseSchema.methods.toggleApproved = async function(id: string): Promise<any>{    
    const operator = await OperatorBase.findById(id)           
    operator.set('approved', !operator.get('approved'))
    operator.set('lastUpdate', Date.now())
    await operator.save()
    return operator._id
}

operatorBaseSchema.methods.ToggleActive = async function(id: string): Promise<any> {
    const operator = await OperatorBase.findById(id)        
    operator.set('isActive', !operator.get('isActive'))
    operator.set('lastUpdate', Date.now())
    await operator.save()
    return operator
}

const OperatorBase = Mongoose.model('Operators', operatorBaseSchema)
export { OperatorBase }