import { BaseController, GenericAppError } from '../../../core';
import { ClientService } from '../services/client.service';
import { ClientErrors } from '../repository';

export class GetAllBranchesClientController extends BaseController{        
    /**
     *
     */
    constructor(private readonly clientService: ClientService) {
        super();        
    }

    async executeImpl(): Promise<any> {                
        try{                      
            const id = this.req.params.idClient  
            const result = await this.clientService.GetBranchesOfficeByIdClient(id) as any
            if(result.isLeft()) {
                const error = result.value;
                switch(error.constructor){   
                    case GenericAppError.NotFoundError:
                        return this.notFound(error.errorValue())
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