import { User } from '../schemas/user'
import { ProfileBase  } from '../schemas/profileBase'
import { MongoMessages } from '../../constants'

const superUser = {
    "username": "master",        
    "email": "superuser@safetyntrust.com",
    "password": "Akaxa01*",
    "isEmailVerified": "false",    
    "mustChangePassword": false,
    "isActive": true,
    "role": "SuperAdmin"
}

const profileSuperUser = {
    "firstName": "Administrador",
    "lastName": "Akaxa",
    "identification": {
        "number": "0",
        "type": "CC"
    },
    "phones": [
        {
            "number": "0",
            "type": "Movil"
        }
    ],
    "email": "superuser@safetyntrust.com",
    "profilePicture"  : MongoMessages.resources.defaultPic,
    "isActive": "true",
    "mainUser": '0'
}

export const loadSeed = async () => {
    try{
    const user = new User(superUser)
    await user.save()
    profileSuperUser.mainUser = user._id
    const profile = new ProfileBase(profileSuperUser)
    await profile.save()    
    console.log('Database initialized')
    } catch(e) {        
        console.log('Already initialized database.')
    }
}