import { BaseController } from '../../../core';
import { ClientDto } from '../dtos';
import { ClientService } from '../services/client.service';
import { ClientErrors } from '../repository';

export class CreateClientController extends BaseController{        
    /**
     *
     */
    constructor(private readonly clientService: ClientService) {
        super();        
    }

    async executeImpl(): Promise<any> {            
        try{            
            const dto : ClientDto = this.req.body as ClientDto            
            const result = await this.clientService.CreateClient(dto) as any
            if(result.isLeft()) {
                const error = result.value
                switch(error.constructor){                    
                    default:
                        return this.clientError(error.errorValue())
                }
            } else {
                return this.ok(result.value.getValue())
            }
        } catch (error) {
            return this.fail(error)
        }        
    }
    
}