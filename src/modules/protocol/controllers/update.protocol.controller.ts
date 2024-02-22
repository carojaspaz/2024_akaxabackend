import { BaseController } from '../../../core';
import { ProtocolUpdateDto } from '../dtos';
import { ProtocolService } from '../services/protocol.service';
import { ProtocolErrors } from '../repository';

export class UpdateProtocolController extends BaseController{        
    /**
     *
     */
    constructor(private readonly protocolService: ProtocolService) {
        super();        
    }

    async executeImpl(): Promise<any> {                
        try{             
            const id = this.req.params.id
            const dto : ProtocolUpdateDto = this.req.body as ProtocolUpdateDto            
            const result = await this.protocolService.UpdateProtocol(id, dto) as any
            if(result.isLeft()) {
                const error = result.value;
                switch(error.constructor){   
                    case ProtocolErrors.ProtocolAlreadyExists:
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