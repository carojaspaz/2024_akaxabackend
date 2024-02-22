import { BaseController, loadProfilePic } from '../../../core';
import { UpdateProfileBaseDto } from '../dtos';
import { ProfileService } from '../services/profile.service';
import { ProfileErrors } from '../repository';

export class UpdateProfileAdminController extends BaseController{        
    /**
     *
     */
    constructor(private readonly profileService: ProfileService) {
        super();        
    }

    async executeImpl(): Promise<any> {                
        try{            
            const id = this.req.params.id
            const dto : UpdateProfileBaseDto = this.req.body as UpdateProfileBaseDto;            
            const result = await this.profileService.UpdateProfileAdmin(id, dto) as any;
            if(result.isLeft()) {
                const error = result.value;
                switch(error.constructor){                    
                    default:
                        return this.clientError(error.errorValue());
                }
            } else {
                return this.ok(result.value.getValue());
            }
        } catch (error) {
            return this.fail(error);
        }        
    }
    
}