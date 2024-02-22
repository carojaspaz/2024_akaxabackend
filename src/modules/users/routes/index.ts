import * as express from 'express';
import { auth } from '../../../core';
import { 
    createUserController, 
    loginUserController, 
    getAllUserController,
    getByEmailUserController,
    getByUsernameUserController,
    resetPasswordUserController,
    changePasswordUserController,
    getTasksUserController
} from '../controllers';

const userRouter = express.Router();

userRouter.post('/user/login/',
    (req, res) => loginUserController.execute(req, res))

userRouter.post('/user/changePassword', auth,
    (req, res) => changePasswordUserController.execute(req, res))

userRouter.post('/user/resetPassword/',
    (req, res) => resetPasswordUserController.execute(req, res))

userRouter.post('/user/', auth, 
    (req, res) =>  createUserController.execute(req, res))

userRouter.get('/user/all/', auth, 
    (req, res) => getAllUserController.execute(req, res))

userRouter.get('/user/:username', auth,
    (req, res) => getByUsernameUserController.execute(req, res))

userRouter.post('/user/byEMail/', auth,
    (req, res) => getByEmailUserController.execute(req, res))

userRouter.post('/user/tasks/', auth,
    (req, res) => getTasksUserController.execute(req, res))

export { userRouter }