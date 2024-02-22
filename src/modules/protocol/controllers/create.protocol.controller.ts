import { BaseController } from '../../../core';
import { ProtocolDto } from '../dtos';
import { ProtocolService } from '../services/protocol.service';
import { ProtocolErrors } from '../repository';

export class CreateProtocolController extends BaseController{        
    /**
     *
     */
    constructor(private readonly protocolService: ProtocolService) {
        super();        
    }

    async executeImpl(): Promise<any> {                
        try{            
            const dto : ProtocolDto = this.req.body as ProtocolDto            
            const result = await this.protocolService.CreateProtocol(dto) as any
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