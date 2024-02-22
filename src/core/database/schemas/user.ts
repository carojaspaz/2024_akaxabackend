import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import validator from 'validator';

import { translate } from '../../localization';
import { roles, rolesNamesArray } from '../../enums';

const userSchema = new mongoose.Schema({
    username: {
        type: String,        
        required: [true, translate('requiredField' , 'schema' , ['username'])],
        unique: true
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
    password: {
        type: String,
        required: [true, translate('requiredField' , 'schema' , ['password'])]
    },
    isEmailVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    mustChangePassword: {
        type: Boolean,
        required: true,
        default: true        
    },
    googleId: {
        type: Number,
        required: false
    },
    facebookId: {
        type: Number,
        required: false
    },
    registerDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    role: { 
        type: String,
        enum: {
            values: Object.values(roles),
            name: 'Role',
            message: translate('invalidRole','user', rolesNamesArray)
        },
        default: roles.Anonymous,        
        required: true
    }
}, { versionKey: false });

userSchema.pre('save', async function(done) {    
    const user = this    
    if(user.isNew){        
        if(!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(user.get('password')))){
            user.invalidate('password', translate('password', 'schema' ))
            done(new Error(translate('password', 'schema')))
        } else {
            const hashPassword = await bcrypt.hash(user.get("password"), 10)
            user.set("password", hashPassword)     
        }     
    } else if (user.isModified('password')) {
        if(!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(user.get('password')))){
            user.invalidate('password', translate('password', 'schema' ))
            done(new Error(translate('password', 'schema')))
        } else {
            const hashPassword = await bcrypt.hash(user.get("password"), 10)
            user.set("password", hashPassword)     
        }     
    }
    done()
});

userSchema.post('save', function(err: any, doc: any, next: any) {
    if(err.name === "MongoServerError" && err.code === 11000) {
        next(new Error(translate('uniqueFiled', 'schema', ['email'])))
    } else {
        next()
    }
})

userSchema.methods.CreateUser = async function(raw: any) : Promise<any> {
    const user = new User(raw);    
    await user.save();      
    return user._id
}

userSchema.methods.UpdateUser = async function(raw: any, email: string) {
    const id = await (await User.findOne({'email': email}))._id
    const user = new User(raw)
    user._id = id
    await user.save()
}

userSchema.methods.ChangePassword = async function(email: string, newPassword: string){
    const user = await User.findOne({'email': email})
    user.set('password', newPassword)
    user.set('mustChangePassword', false)
    await user.save()
}

userSchema.methods.ResetPassword = async function(email: string, newPassword: string){
    const user = await User.findOne({'email': email})
    user.set('password', newPassword)
    user.set('mustChangePassword', true)
    await user.save()
}

Object.assign(userSchema.statics, { roles });
const User = mongoose.model('User', userSchema)
export { User }