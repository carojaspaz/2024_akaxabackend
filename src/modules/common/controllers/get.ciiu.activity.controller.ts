import { BaseController } from '../../../core'
import { CommonService } from '../services/common.service'

export class GetCiiuActivityController extends BaseController{  
    /**
     *
     */
    constructor(private readonly commonService: CommonService) {
        super();        
    }          

    async executeImpl(): Promise<any> {        
        try{            
            const section = this.req.params.section
            const division = this.req.params.division
            const subdivision = this.req.params.subdivision
            const activity = this.req.params.activity
            const result = await this.commonService.GetActivityName(section, division, subdivision, activity) as any;            
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