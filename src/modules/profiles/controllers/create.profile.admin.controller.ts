import { BaseController } from '../../../core';
import { ProfileBaseDto } from '../dtos';
import { ProfileService } from '../services/profile.service';
import { ProfileErrors } from '../repository';

export class CreateProfileAdminController extends BaseController{        
    /**
     *
     */
    constructor(private readonly profileService: ProfileService) {
        super();        
    }

    async executeImpl(): Promise<any> {                
        try{            
            const dto : ProfileBaseDto = this.req.body as ProfileBaseDto      
            const result = await this.profileService.CreateProfileAdmin(dto) as any
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