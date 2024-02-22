import { BaseController, GenericAppError } from '../../../core';
import { OpertorService } from '../services/operator.service';

export class ToggleApproveOperatorController extends BaseController{        
    /**
     *
     */
    constructor(private readonly operatorService: OpertorService) {
        super();        
    }

    async executeImpl(): Promise<any> {        
        try{            
            const id = this.req.params.id
            const result = await this.operatorService.ToggleApproveOperator(id) as any;
            if(result.isLeft()) {
                const error = result.value;
                switch(error.constructor){
                    case GenericAppError.NotFoundError:
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