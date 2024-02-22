import { BaseController } from '../../../core';
import { CompanyTypeDto } from '../dtos';
import { CommonService } from '../services/common.service';
import { CommonErrors } from '../repository';

export class CreateActivityVerifyController extends BaseController{        
    /**
     *
     */
    constructor(private readonly commonService: CommonService) {
        super();        
    }

    async executeImpl(): Promise<any> {            
        try{            
            const { activity, description } = this.req.body
            const result = await this.commonService.saveActivityVerify(activity, description) as any
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