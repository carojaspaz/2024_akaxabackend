import { BaseController, GenericAppError } from '../../../core';
import { ProfileService } from '../services/profile.service';
import { ProfileErrors } from '../repository';

export class ToggleApprovePartnerController extends BaseController{        
    /**
     *
     */
    constructor(private readonly profileService: ProfileService) {
        super();        
    }

    async executeImpl(): Promise<any> {        
        try{            
            const id = this.req.params.id
            const result = await this.profileService.ToggleApprovePartner(id) as any;
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