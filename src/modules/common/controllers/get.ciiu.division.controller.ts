import { BaseController } from '../../../core'
import { CommonService } from '../services/common.service'

export class GetCiiuDivisionController extends BaseController{  
    /**
     *
     */
    constructor(private readonly commonService: CommonService) {
        super();        
    }          

    async executeImpl(): Promise<any> {        
        try{            
            const section = this.req.params.section
            const result = await this.commonService.GetDivisionsBySection(section) as any;            
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