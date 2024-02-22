import { BaseController } from '../../../core';
import { ProtocolService } from '../services/protocol.service';
import { ProtocolErrors } from '../repository';

export class GetEvidenceAuditController extends BaseController{        
    /**
     *
     */
    constructor(private readonly protocolService: ProtocolService) {
        super();        
    }

    async executeImpl(): Promise<any> {                
        try{                     
            const audit = this.req.params.audit                               
            const result = await this.protocolService.GetEvidenceByAudit(audit) as any
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