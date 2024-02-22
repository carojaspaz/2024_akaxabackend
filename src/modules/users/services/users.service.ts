import { userRepository } from '../repository'
import { UserDto, LoginUserDto, ChangePasswordUserDto } from '../dtos';

export class UsersService {    

    async CreateUser(user: UserDto): Promise<any> {                    
        return await userRepository.save(user)        
    }

    async LoginUser(loginUser: LoginUserDto): Promise<any> {
        return await userRepository.login(loginUser)
    }

    async ChangePassword(changePasswordUser: ChangePasswordUserDto): Promise<any> {
        return await userRepository.changePassword(changePasswordUser)
    }

    async ResetPassword(email: string): Promise<any> {
        return await userRepository.resetPassword(email)
    }

    async GetByMailUsers(email: string): Promise<any>{
        return await userRepository.findUserByEmail(email)
    }
    
    async GetByUsernameUsers(username: string): Promise<any>{
        return await userRepository.findUserByUserName(username)        
    }

    async GetAllUsers(): Promise<any>{
        return await userRepository.getAllUsers()
    }    

    async GetTasksUser(email: string): Promise<any>{
        return await userRepository.taskUser(email)
    }
}