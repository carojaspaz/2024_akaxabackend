import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'
import moment = require('moment')

import { UserErrors } from './user.repository.error'
import { Either, GenericAppError, Result, left, right, rolesNames, Utils, translate } from '../../../core'

import { ApiConfig, MailService } from '../../../core'
import { Config } from '../../../config'

import { UserMap } from '../mappers/userMap';
import { UserDto, LoginUserDto, LoggedUserDto, ChangePasswordUserDto } from '../dtos'

type Response = Either<
    GenericAppError.UnexpectedError | 
    GenericAppError.NotFoundError |  
    UserErrors.AccountAlreadyExists | 
    UserErrors.AccountDoesNotExists |
    UserErrors.AccountInactive | 
    UserErrors.PasswordDoesNotMatch |   
    UserErrors.NeedChangePassword |   
    Result<any>,   
    Result<void>>

export interface IUserRepo {    
    save(user: UserDto): Promise<Response>  
    login(userLogin: LoginUserDto): Promise<Response>
    getToken(loginUser: LoginUserDto): Promise<Response>
    findUserByEmail(email: string): Promise<Response>
    findUserByUserName(username: string): Promise<Response>
    getAllUsers():Promise<Response>
    exists(email: string): Promise<boolean>
    isActive(email: string): Promise<boolean>
    checkPassword(loginUser: LoginUserDto): Promise<boolean>    
    changePassword(changePasswordUser: ChangePasswordUserDto): Promise<boolean>
    resetPassword(email: string): Promise<boolean>
    taskUser(email: string): Promise<boolean>
}
export class UserRepository implements IUserRepo {
    private map: UserMap
    private models: any
    private removeId = { "_id": 0 }

    constructor(models: any){
        this.models = models
        this.map = new UserMap()
    }        

    public async save(user: UserDto): Promise<Response> {        
        const newUser = this.models.User;              
        try{                        
            const rawUser = this.map.toPersistence(user);
            const id = await newUser.schema.methods.CreateUser(rawUser);
            MailService.sendMail(user.email, user.password)
            return right(Result.ok<any>(id)) as Response            
        }
        catch(error){                        
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }          
    public async login(loginUser: LoginUserDto): Promise<Response> {
        try{
            const exist = await this.exists(loginUser.email)
            if(exist){                      
                return this.getToken(loginUser)                                                         
            } else {
                return left(new UserErrors.AccountDoesNotExists(loginUser.email)) as Response
            }
        }
        catch(error){
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }    
    public async getToken(loginUser: LoginUserDto): Promise<Response>{
        var query = { email: { $regex: new RegExp(`^${loginUser.email.toLowerCase()}`,'i')}  }
        const user = await this.models.User.findOne(query)
        if(user['isActive']){
            const isPasswordMatch = await bcrypt.compare(loginUser.password, user['password'])
            if(isPasswordMatch){                
                const secret = Config.jwtSecret;
                if(user['mustChangePassword']){
                    const tmpExpiration = moment(Date.now()).add(ApiConfig.setup.tokenTmpValid, 'minutes');
                    const tokenTmp = jwt.sign({
                        email: user.email,
                        username: user.username,
                        role: user.role,
                        expiration: tmpExpiration
                    }, secret);         
                    return left(new UserErrors.NeedChangePassword(tokenTmp)) as Response
                }
                const expiration = moment(Date.now()).add(ApiConfig.setup.tokenValidDays,'days').endOf('day');
                const token = jwt.sign({
                    email: user.email,
                    username: user.username,
                    role: user.role,
                    expiration: expiration
                }, secret);         
                var queryProfile = { mainUser: user._id }
                const profile = await this.models.ProfileBase.findOne(queryProfile)
                let clientId = ''
                if(user.role === 'Client'){
                    var queryClient = { contact: profile._id }
                    const client = await this.models.Client.findOne(queryClient)
                    clientId = client? client._id : ''
                }                
                const logged: LoggedUserDto = { 
                    email: user.email,
                    username: user.username,
                    fullName: `${profile?.firstName} ${profile?.lastName}`,
                    profilePicture: profile?.profilePicture,
                    idClient: clientId,
                    role: user.role,
                    token: token
                }    

                return right(Result.ok<any>(logged)) as Response
            } else {
                return left(new UserErrors.PasswordDoesNotMatch()) as Response
            }        
        } else {
            return left(new UserErrors.AccountInactive(loginUser.email)) as Response
        }
    }
    public async findUserByEmail(email: string): Promise<any> {        
        var query = { email: { $regex: new RegExp(`^${email.toLowerCase()}`,'i')} };
        const user = await this.models.User.findOne(query, this.removeId);
        if(!!user === true){
            return right(Result.ok<any>(this.map.toDto(user)))
        } else {
            return left(new GenericAppError.NotFoundError())
        }        
    }
    public async findUserByUserName(username: string): Promise<any> {
        var query = { username: { $regex: new RegExp(`^${username.toLowerCase()}`,'i')}  };
        const user = await this.models.User.findOne(query, this.removeId);
        if(!!user === true){
            return right(Result.ok<any>(this.map.toDto(user))) as Response
        } else {
            return left(new GenericAppError.NotFoundError()) as Response
        }        
    }
    public async getAllUsers(): Promise<any> {
        const user = this.models.User;
        try{
            const users = await user.find({}, this.removeId); 
            if(users.length > 0){
                let viewUsers: any[] = []
                users.forEach((element: any) => {
                    if(element.role !== rolesNames.SuperAdmin) viewUsers.push(this.map.toDto(element))
                });        
                return right(Result.ok<any>(viewUsers)) as Response
            } else {
                return left(new GenericAppError.NotFoundError()) as Response
            }
        } catch(e) {
            return left(new GenericAppError.UnexpectedError(e)) as Response
        }
    }
    public async exists(email: string): Promise<boolean> {
        var query = { email: { $regex: new RegExp(`^${email.toLowerCase()}`,'i')} }
        const user = await this.models.User.findOne(query)
        return !!user === true
    }        
    public async isActive(email: string): Promise<boolean> {
        var query = { email: { $regex: new RegExp(`^${email.toLowerCase()}`,'i')} };
        const user = await this.models.User.findOne(query);
        return !!user === true && user['isActive'];
    }
    public async checkPassword(loginUser: LoginUserDto): Promise<any>{
        try{
            var query = { email: { $regex: new RegExp(`^${loginUser.email.toLowerCase()}`,'i')} }
            const user = await this.models.User.findOne(query)
            const isPasswordMatch = await bcrypt.compare(loginUser.password, user['password'])
            return right(Result.ok<any>(isPasswordMatch)) as Response    
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        } 
    }   
    public async changePassword(changePasswordUser: ChangePasswordUserDto): Promise<any>{
        try{
            var query = { email: { $regex: new RegExp(`^${changePasswordUser.email.toLowerCase()}`,'i')}  }
            const user = await this.models.User.findOne(query)
            await user.schema.methods.ChangePassword(changePasswordUser.email, changePasswordUser.newPassword)            
            return right(Result.ok<any>()) as Response                
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }            
    }
    public async resetPassword(email: string): Promise<any> {
        try{
            var query = { email: { $regex: new RegExp(`^${email.toLowerCase()}`,'i')} }
            const user = await this.models.User.findOne(query)            
            if(user){
                const newPassword = Utils.generatePassword()
                const passwordChanged = await user.schema.methods.ResetPassword(email, newPassword)                   
                MailService.resetPasswordSendMail(user.email, newPassword)
                return right(Result.ok<any>({message: translate('resetPasswordSubject','mail',[])})) as Response    
            } else {                
                return left(new UserErrors.AccountDoesNotExists(email)) as Response
            }
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async taskUser(email: string): Promise<any>{
        try{
            var query = { email: { $regex: new RegExp(`^${email}`,'i')} }
            const user = await this.models.User.findOne(query)
            if(user){
                const tasks = await this.models.TasksList.find({idUser: user._id})
                let tasksList: any[] = []
                tasks.forEach((element: any) => {
                    tasksList.push(this.map.toViewList(element))
                })
                return right(Result.ok<any>(tasksList)) as Response    
            } else {
                return left(new GenericAppError.NotFoundError()) as Response    
            }
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
}