import { BaseController } from '../../../core'
import { UsersService } from '../services/users.service'

export class GetAllUserController extends BaseController{  
    /**
     *
     */
    constructor(private readonly usersService: UsersService) {
        super();        
    }          

    async executeImpl(): Promise<any> {        
        try{            
            const result = await this.usersService.GetAllUsers() as any
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