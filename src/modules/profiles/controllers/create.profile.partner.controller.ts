import { BaseController } from '../../../core';
import { ProfilePartnerDto } from '../dtos';
import { ProfileService } from '../services/profile.service';
import { ProfileErrors } from '../repository';

export class CreateProfilePartnerController extends BaseController{        
    /**
     *
     */
    constructor(private readonly profileService: ProfileService) {
        super();        
    }

    async executeImpl(): Promise<any> {
        const dto : ProfilePartnerDto = this.req.body as ProfilePartnerDto;
        try{            
            const result = await this.profileService.CreateProfilePartner(dto) as any;
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