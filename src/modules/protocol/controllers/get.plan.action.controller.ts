import { BaseController, GenericAppError } from '../../../core';
import { ProtocolService } from '../services/protocol.service';
import { ProtocolErrors } from '../repository';

export class GetPlanActionController extends BaseController{        
    /**
     *
     */
    constructor(private readonly protocolService: ProtocolService) {
        super();        
    }

    async executeImpl(): Promise<any> {                
        try{             
            const id = this.req.params.id
            const result = await this.protocolService.GetPlanAction(id) as any
            if(result.isLeft()) {
                const error = result.value;
                switch(error.constructor){   
                    case GenericAppError.NotFoundError:
                        return this.notFound(error.errorValue())                                  
                    default:
                        return this.clientError(error.errorValue())
                }
            } else {
                return this.ok(result.value.getValue());
            }
        } catch (error) {
            return this.fail(error);
        }        
    }
    
}