
import { PermissionRoleRepository  } from './permission.repository';
import { models } from '../../../core';


const permissionRoleRepository = new PermissionRoleRepository(models);

export {
    permissionRoleRepository
}