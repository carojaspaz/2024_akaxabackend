import { BaseController, AddressDto } from '../../../core'
import { OpertorService } from '../services/operator.service';
import { OperatorErrors } from '../repository';


export class UpdateAddressOperatorController extends BaseController{  
    /**
     *
     */
    constructor(private readonly opertorService: OpertorService) {
        super();        
    }          

    async executeImpl(): Promise<any> {        
        try{                                   
            const id = this.req.params.id                        
            const dto : AddressDto = this.req.body as AddressDto;
            const result = await this.opertorService.AddUpdateAddressOperator(id, dto) as any
            if(result.isLeft()) {
                const error = result.value;
                switch(error.constructor){     
                    case OperatorErrors.OperatorDoesNotExists:
                        return this.notFound(error.errorValue().message)   
                    default:
                        return this.clientError(error.errorValue().message)
                }
            } else {
                return this.ok(result.value.getValue());
            } 
        } catch (error) {
            return this.fail(error);
        }        
    }
    
}