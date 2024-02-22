import { BaseController } from '../../../core';
import { CommonService } from '../services/common.service';
import { CommonErrors } from '../repository';

export class SendMailController extends BaseController{        
    /**
     *
     */
    constructor(private readonly commonService: CommonService) {
        super();        
    }

    async executeImpl(): Promise<any> {            
        try{
            const { email }  = this.req.body     
            const result = await this.commonService.sendMail(email) as any
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