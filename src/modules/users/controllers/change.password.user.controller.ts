import { BaseController } from '../../../core'
import { ChangePasswordUserDto } from '../dtos/index'
import { UsersService } from '../services/users.service'
import { UserErrors } from '../repository'

export class ChangePasswordUserController extends BaseController{        
    /**
     *
     */
    constructor(private readonly usersService: UsersService) {
        super();        
    }

    async executeImpl(): Promise<any> {
        const dto : ChangePasswordUserDto = this.req.body as ChangePasswordUserDto
        try{            
            const result = await this.usersService.ChangePassword(dto) as any
            if(result.isLeft()) {
                const error = result.value
                switch(error.constructor){
                    case UserErrors.AccountAlreadyExists:
                        return this.conflict(error.errorValue().message)
                    default:
                        return this.clientError(error.errorValue())
                }
            } else {
                return this.ok()
            }
        } catch (error) {
            return this.fail(error)
        }        
    }
    
}