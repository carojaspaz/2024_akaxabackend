
import { rolesNames } from '../../enums';

export interface IPermissionRoleRepo {
    isAllowed(role: string, url: string): Promise<boolean>;
}

export class PermissionRoleRepository implements IPermissionRoleRepo{
    private models: any;

    constructor(models: any){
        this.models = models;
    }

    public async isAllowed(role: string, url: string): Promise<boolean> {        
        var query = { 'role': role, 'routes': { $in: [url, 'all']}};
        const permission = await this.models.PermissionRole.findOne(query);
        if(!permission){
            var queryAnonymous = { 'role': rolesNames.Anonymous, 'routes': url};
            const anonymous = await this.models.PermissionRole.findOne(queryAnonymous);
            if(!anonymous){
                return false;
            } else {
                return anonymous['access'] as boolean;
            }
        } else {
            return permission['access'] as boolean;
        }
    }
    
}