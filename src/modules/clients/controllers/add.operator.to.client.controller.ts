import { BaseController } from '../../../core';
import { ClientService } from '../services/client.service';
import { ClientErrors } from '../repository';

export class AddOperatorToClientController extends BaseController{        
    /**
     *
     */
    constructor(private readonly clientService: ClientService) {
        super();        
    }

    async executeImpl(): Promise<any> {            
        try{            
            const { idClient, idOperator } = this.req.params
            const result = await this.clientService.AddOperatorToClient(idClient, idOperator) as any
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