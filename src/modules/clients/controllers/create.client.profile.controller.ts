import { BaseController } from '../../../core';
import { ProfileBaseDto } from '../../profiles/dtos';
import { ClientService } from '../services/client.service';
import { ClientErrors } from '../repository';

export class CreateClientProfileController extends BaseController{        
    /**
     *
     */
    constructor(private readonly clientService: ClientService) {
        super();        
    }

    async executeImpl(): Promise<any> {                
        try{            
            const id = this.req.params.idClient
            const dto : ProfileBaseDto = this.req.body as ProfileBaseDto            
            const result = await this.clientService.CreateProfileClient(id, dto) as any
            if(result.isLeft()) {
                const error = result.value;
                switch(error.constructor){     
                    case ClientErrors.ClientDoesNotExists:
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