import { BaseController } from '../../../core';
import { ProtocolService } from '../services/protocol.service';
import { ProtocolErrors } from '../repository';

export class GetEvidenceByItemAuditController extends BaseController{        
    /**
     *
     */
    constructor(private readonly protocolService: ProtocolService) {
        super();        
    }

    async executeImpl(): Promise<any> {                
        try{                     
            const {audit, category, item} = this.req.params
            const result = await this.protocolService.GetEvidenceByItemAudit(audit,category,item) as any
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