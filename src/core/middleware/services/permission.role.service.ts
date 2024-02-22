import { permissionRoleRepository } from '../repository';

export class PermissionRoleService {
    public static async checkPermission(role: string, url: string): Promise<boolean> {
        return permissionRoleRepository.isAllowed(role, url);
    }
}