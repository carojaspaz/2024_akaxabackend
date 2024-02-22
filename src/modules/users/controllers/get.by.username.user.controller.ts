import { BaseController } from '../../../core'
import { UserErrors } from '../repository'
import { UsersService } from '../services/users.service'

export class GetByUsernameUserController extends BaseController{  
    /**
     *
     */
    constructor(private readonly usersService: UsersService) {
        super();        
    }          

    async executeImpl(): Promise<any> {        
        try{            
            const username = this.req.params.username
            const result = await this.usersService.GetByUsernameUsers(username) as any
            if(result.isLeft()) {
                const error = result.value
                switch(error.constructor){
                    case UserErrors.AccountDoesNotExists:
                        return this.notFound(error.errorValue().message)
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