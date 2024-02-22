import { BaseController } from '../../../core';
import { BranchOfficeDto } from '../dtos';
import { ClientService } from '../services/client.service';
import { ClientErrors } from '../repository';

export class CreateBranchOfficeController extends BaseController{        
    /**
     *
     */
    constructor(private readonly clientService: ClientService) {
        super();        
    }

    async executeImpl(): Promise<any> {            
        try{            
            const dto : BranchOfficeDto = this.req.body as BranchOfficeDto            
            const result = await this.clientService.CreateBranchOffice(dto) as any
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