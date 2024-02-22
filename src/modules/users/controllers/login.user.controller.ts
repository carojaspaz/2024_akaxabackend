import { BaseController } from '../../../core';
import { LoginUserDto } from '../dtos/login.user.dto';
import { UsersService } from '../services/users.service';
import { UserErrors } from '../repository';

export class LoginUserController extends BaseController{        
    /**
     *
     */
    constructor(private readonly usersService: UsersService) {
        super();        
    }

    async executeImpl(): Promise<any> {
        const dto : LoginUserDto = this.req.body as LoginUserDto;
        try{            
            const result = await this.usersService.LoginUser(dto) as any;
            if(result.isLeft()) {
                const error = result.value;
                switch(error.constructor){
                    case UserErrors.AccountDoesNotExists:
                        return this.notFound(error.errorValue().message);
                    case UserErrors.PasswordDoesNotMatch:
                        return this.forbidden(error.errorValue().message);
                    case UserErrors.AccountInactive:
                        return this.forbidden(error.errorValue().message);    
                    case UserErrors.NeedChangePassword:
                        return this.deleted(error.errorValue().message);
                    default:
                        return this.clientError(error.errorValue());
                }
            } else {
                return this.ok(result.value.getValue());
            }
        } catch (error) {
            return this.fail(error);
        }        
    }
    
}