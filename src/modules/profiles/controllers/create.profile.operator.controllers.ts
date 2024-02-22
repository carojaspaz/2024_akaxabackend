import { BaseController } from '../../../core';
import { ProfileOperatorDto } from '../dtos';
import { ProfileService } from '../services/profile.service';
import { ProfileErrors } from '../repository';

export class CreateProfileOperatorController extends BaseController{        
    /**
     *
     */
    constructor(private readonly profileService: ProfileService) {
        super();        
    }

    async executeImpl(): Promise<any> {
        const dto : ProfileOperatorDto = this.req.body as ProfileOperatorDto;
        try{            
            const result = await this.profileService.CreateProfileOperator(dto) as any;
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