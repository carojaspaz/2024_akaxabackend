import { BaseController, loadProfilePic } from '../../../core';
import { UpdateProfileBaseDto } from '../../profiles/dtos';
import { ClientService } from '../services/client.service';
import { ClientErrors } from '../repository';

export class UpdateClientProfileController extends BaseController{        
    /**
     *
     */
    constructor(private readonly clientService: ClientService) {
        super();        
    }

    async executeImpl(): Promise<any> {                
        try{            
            const id = this.req.params.idProfile
            const dto : UpdateProfileBaseDto = this.req.body as UpdateProfileBaseDto;            
            const result = await this.clientService.UpdateProfileClient(id, dto) as any;
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