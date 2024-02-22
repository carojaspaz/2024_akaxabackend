import { BaseController } from '../../../core'
import { CommonService } from '../services/common.service'

export class GetMunicipalitiesStateController extends BaseController{  
    /**
     *
     */
    constructor(private readonly commonService: CommonService) {
        super();        
    }          

    async executeImpl(): Promise<any> {        
        try{            
            const stateCode = this.req.params.stateCode
            const result = await this.commonService.GetMunicipalitiesState(stateCode) as any;
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