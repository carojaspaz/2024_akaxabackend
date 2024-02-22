import { BaseController } from '../../../core';
import { CompanyTypeDto } from '../dtos';
import { CommonService } from '../services/common.service';
import { CommonErrors } from '../repository';

export class UpdateCompanyTypeController extends BaseController{        
    /**
     *
     */
    constructor(private readonly commonService: CommonService) {
        super();        
    }

    async executeImpl(): Promise<any> {            
        try{            
            const id = this.req.params.id
            const dto : CompanyTypeDto = this.req.body as CompanyTypeDto            
            const result = await this.commonService.UpdateCompanyType(id, dto) as any
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