import { BaseController } from '../../../core'
import { UserDto } from '../dtos/index'
import { UsersService } from '../services/users.service'
import { UserErrors } from '../repository'

export class CreateUserController extends BaseController{        
    /**
     *
     */
    constructor(private readonly usersService: UsersService) {
        super();        
    }

    async executeImpl(): Promise<any> {
        const dto : UserDto = this.req.body as UserDto
        try{            
            const result = await this.usersService.CreateUser(dto) as any
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