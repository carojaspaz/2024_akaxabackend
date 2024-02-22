import { BaseController, GenericAppError } from '../../../core'
import { UsersService } from '../services/users.service'

export class GetByEmailUserController extends BaseController{  
    /**
     *
     */
    constructor(private readonly usersService: UsersService) {
        super();        
    }          

    async executeImpl(): Promise<any> {        
        try{            
            const { email } = this.req.body;
            const result = await this.usersService.GetByMailUsers(email) as any;
            if(result.isLeft()) {
                const error = result.value;
                switch(error.constructor){
                    case GenericAppError.NotFoundError:
                        return this.notFound(error.errorValue())
                    default:
                        return this.clientError(error.errorValue())
                }
            } else {
                return this.ok(result.value.getValue());
            }
        } catch (error) {
            return this.fail(error);
        }        
    }
    
}