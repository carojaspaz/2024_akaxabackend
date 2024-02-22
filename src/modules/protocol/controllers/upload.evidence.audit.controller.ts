import { BaseController } from '../../../core'
import { ProtocolService } from '../services/protocol.service';
import { ProtocolErrors } from '../repository';
import fs from 'fs'


export class UploadEvidenceController extends BaseController{  
    /**
     *
     */
    constructor(private readonly protocolService: ProtocolService) {
        super();        
    }

    async executeImpl(): Promise<any> {        
        try{                       
            const file = fs.createReadStream(this.req.file.path)                   
            const {audit, category, item} = this.req.params
            const url = await this.protocolService.UploadEvidence(audit, file, this.req.file.originalname) as any;
            fs.unlinkSync(this.req.file.path)            
            const result = await this.protocolService.SaveEvidence(audit, category, item, url) as any
            if(result.isLeft()) {
                const error = result.value;
                switch(error.constructor){                   
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