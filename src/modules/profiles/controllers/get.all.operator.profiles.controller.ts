import { BaseController, GenericAppError } from '../../../core';
import { ProfileService } from '../services/profile.service';
import { ProfileErrors } from '../repository';

export class GetAllOperatorProfilesController extends BaseController{        
    /**
     *
     */
    constructor(private readonly profileService: ProfileService) {
        super();        
    }

    async executeImpl(): Promise<any> {        
        try{            
            const result = await this.profileService.GetAllOperatorsProfiles() as any;
            if(result.isLeft()) {
                const error = result.value;
                switch(error.constructor){
                    case GenericAppError.NotFoundError:
                        return this.notFound(error.errorValue())
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