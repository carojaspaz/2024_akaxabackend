import * as mongoose from 'mongoose' 

import { phoneType } from './phone.type'

const contactType = new mongoose.Schema({    
    name: String,
    email: String,
    position: String,
    phone: phoneType
},{ _id: false})

export { contactType }