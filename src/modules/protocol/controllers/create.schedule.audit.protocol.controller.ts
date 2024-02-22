import { BaseController } from '../../../core';
import { ProtocolClientDto } from '../dtos';
import { ProtocolService } from '../services/protocol.service';
import { ProtocolErrors } from '../repository';

export class CreateScheduleAuditProtocolController extends BaseController{        
    /**
     *
     */
    constructor(private readonly protocolService: ProtocolService) {
        super();        
    }

    async executeImpl(): Promise<any> {                
        try{            
            const dto : ProtocolClientDto = this.req.body as ProtocolClientDto            
            const result = await this.protocolService.SaveScheduleProtocol(dto) as any
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