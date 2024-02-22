import { BaseController } from '../../../core';
import { UsersService } from '../services/users.service';
import { UserErrors } from '../repository';

export class ResetPasswordUserController extends BaseController{        
    /**
     *
     */
    constructor(private readonly usersService: UsersService) {
        super();        
    }

    async executeImpl(): Promise<any> {
        const { email } = this.req.body
        try{            
            const result = await this.usersService.ResetPassword(email) as any;            
            if(result.isLeft()) {
                const error = result.value;                
                switch(error.constructor){
                    case UserErrors.AccountAlreadyExists:
                        return this.conflict(error.errorValue().message);
                    case UserErrors.AccountDoesNotExists:
                        return this.notFound(error.errorValue().message);
                    default:
                        return this.clientError(error.errorValue().message);
                }
            } else {
                return this.ok(result.value.getValue());
            }
        } catch (error) {
            return this.fail(error);
        }        
    }
    
}