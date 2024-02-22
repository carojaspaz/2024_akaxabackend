import { BaseController, AddressDto } from '../../../core'
import { ProfileService } from '../services/profile.service';
import { ProfileErrors } from '../repository';


export class UpdateAddressProfileController extends BaseController{  
    /**
     *
     */
    constructor(private readonly profileService: ProfileService) {
        super();        
    }          

    async executeImpl(): Promise<any> {        
        try{                                   
            const id = this.req.params.id            
            const mainAddress: boolean = this.req.body.mainAddress as boolean
            const dto : AddressDto = this.req.body as AddressDto;
            const result = await this.profileService.AddUpdateAddressProfile(id, mainAddress, dto) as any
            if(result.isLeft()) {
                const error = result.value;
                switch(error.constructor){ 
                    case ProfileErrors.ProfileDoesNotExists:
                        return this.notFound(error.errorValue().message)                  
                    default:
                        return this.clientError(error.errorValue().message);
                }
            } else {
                return this.ok(result.value.getValue());
            } 
        } catch (error) {
            return this.fail(error);
        }        
    }
    
}