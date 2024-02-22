import { BaseController } from '../../../core'
import { CommonService } from '../services/common.service'
import { CommonErrors } from '../repository'

export class GetParameterByCodeController extends BaseController{  
    /**
     *
     */
    constructor(private readonly commonService: CommonService) {
        super();        
    }          

    async executeImpl(): Promise<any> {        
        try{            
            const code = this.req.params.code
            const result = await this.commonService.GetParametersByCode(code) as any;
            if(result.isLeft()) {
                const error = result.value;
                switch(error.constructor){
                    case CommonErrors.ParameterDoesNotExist:
                        return this.notFound(error.errorValue())
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