import { LoginUserController } from './login.user.controller'
import { CreateUserController }  from './create.user.controller'
import { GetAllUserController } from './get.all.user.controller'
import { GetByEmailUserController } from './get.by.email.user.controller'
import { GetByUsernameUserController } from './get.by.username.user.controller'
import { ResetPasswordUserController } from './reset.password.user.controller'
import { ChangePasswordUserController } from './change.password.user.controller'
import {GetTasksUserController} from './get.tasks.user.controller'

import { UsersService } from '../services/users.service'

const usersService = new UsersService()

const loginUserController = new LoginUserController(usersService)
const createUserController = new CreateUserController(usersService)
const getAllUserController = new GetAllUserController(usersService)
const getByEmailUserController = new GetByEmailUserController(usersService)
const getByUsernameUserController = new GetByUsernameUserController(usersService)
const resetPasswordUserController = new ResetPasswordUserController(usersService)
const changePasswordUserController = new ChangePasswordUserController(usersService)
const getTasksUserController = new GetTasksUserController(usersService)

export {   
    loginUserController,
    createUserController,
    getAllUserController,
    getByEmailUserController,
    getByUsernameUserController,
    resetPasswordUserController,
    changePasswordUserController,
    getTasksUserController
}
