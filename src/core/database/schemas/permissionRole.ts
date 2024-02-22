import * as Mongoose from "mongoose";
import { Roles, roles } from '../../enums';

const permissionRoleSchema = new Mongoose.Schema({    
    role: {
        type: String,
        required: true,
        default: Roles.Anonymous
    },
    access: {
        type: Boolean,
        required: true,        
        default: false
    },         
    routes: [{
       type: String,
       maxLength: 80,       
       trim: true
    }]
}, { versionKey: false });

Object.assign(permissionRoleSchema.statics, { roles });
const PermissionRole = Mongoose.model('PermissionRole', permissionRoleSchema);
export { PermissionRole };