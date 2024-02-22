import { BaseController, AddressDto } from '../../../core';
import { ClientService } from '../services/client.service';
import { ClientErrors } from '../repository';

export class UpdateClientProfileAddressController extends BaseController{        
    /**
     *
     */
    constructor(private readonly clientService: ClientService) {
        super();        
    }

    async executeImpl(): Promise<any> {                
        try{            
            const id = this.req.params.idProfile          
            const mainAddress: boolean = this.req.body.mainAddress as boolean
            const dto : AddressDto = this.req.body as AddressDto;
            const result = await this.clientService.AddUpdateAddressProfile(id, mainAddress, dto) as any;
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