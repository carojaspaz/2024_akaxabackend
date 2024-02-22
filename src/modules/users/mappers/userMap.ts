import { UserDto, ViewUserDto, TaskItemDto } from '../dtos';

export class UserMap {
    
    toDto = (t: any): ViewUserDto => {
        const userDto: ViewUserDto = {
            username: t.username,            
            email: t.email,     
            role: t.role,
            isEmailVerified: t.isEmailVerified,
            mustChangePassword: t.mustChangePassword,
            isActive: t.isActive
        }
        return userDto
    }
    
    toPersistence = (t: UserDto): any => {
        const user = {
            username: t.username,            
            email: t.email, 
            password: t.password,    
            role: t.role,            
        }
        return user
    }    

    toViewList = (t: any): TaskItemDto => {
        const itemDto: TaskItemDto = {
            task: t.task,
            date: t.date,
            isActive: t.isActive
        }
        return itemDto
    }
}