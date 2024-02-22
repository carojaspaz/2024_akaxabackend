import { BaseController } from '../../../core';
import { OperatorErrors } from '../repository';
import { OpertorService } from '../services/operator.service'
import { OperatorLegalDto } from '../dtos'

export class CreateOperatorLegal extends BaseController {
    /**
     * 
     */
    constructor(private readonly operatorService: OpertorService){
        super()
    }

    async executeImpl(): Promise<any> {        
        try{
            const dto: OperatorLegalDto = this.req.body as OperatorLegalDto
            const result = await this.operatorService.CreateOperatorLegal(dto) as any
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