import { BaseController } from '../../../core';
import { OperatorErrors } from '../repository';
import { OpertorService } from '../services/operator.service'
import { OperatorNaturalDto } from '../dtos'

export class CreateOperatorNatural extends BaseController {
    /**
     * 
     */
    constructor(private readonly operatorService: OpertorService){
        super()
    }

    async executeImpl(): Promise<any> {        
        try{
            const dto: OperatorNaturalDto = this.req.body as OperatorNaturalDto
            const result = await this.operatorService.CreateOperatorNatural(dto) as any
            if(result.isLeft()){
                const error = result.value
                switch(error.constructor){
                    default:
                        return this.clientError(error.errorValue())
                }
            } else {
                return this.ok(result.value.getValue());
            }
        } catch ( error ) {
            return this.fail(error)
        }
    }

}