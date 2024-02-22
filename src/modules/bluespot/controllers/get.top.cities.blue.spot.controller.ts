import { BaseController } from '../../../core'
import { BlueSpotErrors } from '../repository'
import { BlueSpotService } from '../services/bluespot.service'

export class GetTopCitiesBlueSpotsController extends BaseController{  
    /**
     *
     */
    constructor(private readonly bluespotService: BlueSpotService) {
        super();        
    }          

    async executeImpl(): Promise<any> {        
        try{            
            const result = await this.bluespotService.getTopCities() as any;
            if(result.isLeft()) {
                const error = result.value;
                switch(error.constructor){
                    case BlueSpotErrors.NotFound:
                        return this.notFound(error.errorValue().message);
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