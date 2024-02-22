import { BaseController, GenericAppError } from '../../../core';
import { ProtocolService } from '../services/protocol.service';
import { ProtocolErrors } from '../repository';
import { CIUUFilterDto } from '../dtos'

export class GetProtocolController extends BaseController{        
    /**
     *
     */
    constructor(private readonly protocolService: ProtocolService) {
        super();        
    }

    async executeImpl(): Promise<any> {                
        try{             
            const dto : CIUUFilterDto = this.req.body as CIUUFilterDto            
            const result = await this.protocolService.GetProtocol(dto) as any
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