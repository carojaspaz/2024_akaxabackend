import { OperatorErrors } from './operator.repository.errors'
import { Either, GenericAppError, Result, left, right, Utils, AddressDto } from '../../../core'

import { MongoMessages, rolesNames } from '../../../core'

import { OperatorMap } from '../mappers/operatorMap'
import { OperatorNaturalDto, OperatorLegalDto } from '../dtos'

import { UsersService } from '../../users/services/users.service'
import { ProfileService } from '../../profiles/services/profile.service'
import { ProfileOperatorDto } from '../../profiles/dtos'

type Response = Either<
GenericAppError.UnexpectedError | 
GenericAppError.NotFoundError |
Result<any>,   
Result<void>>

export interface IOperatorRepo {
    createOperatorNatural(operatorNatural: OperatorNaturalDto): Promise<Response>
    createOperatorLegal(operatorLegal: OperatorLegalDto): Promise<Response>
    updateOperatorPic(id: string, ulr: string): Promise<Response>
    updateOperatorAddress(id: string, address: AddressDto): Promise<Response>
    toggleApproveOperator(id: string): Promise<Response>
    getAll(): Promise<Response>
    getById(id: string): Promise<Response>
}

export class OperatorRepository implements IOperatorRepo {
    private map: OperatorMap
    private models: any    
    private removeId = { "_id": 0 }


    /**
     * 
     */
    constructor(models: any) {
        this.models = models
        this.map = new OperatorMap()
    }
    public async createOperatorNatural(operatorNatural: OperatorNaturalDto): Promise<Response> {
        const newOperator = this.models.OperatorNatural
        try{
            const operator = await newOperator.schema.methods.CreateOperator(operatorNatural)
            const profileOperator = await this.createProfile(this.map.toProfileBaseDto(operatorNatural)) as any           
            if(profileOperator.isRight()){
                this.updateOperator(profileOperator.value.getValue(), operator)
            }            
            return right(Result.ok<any>(operator)) as Response                                 
        } catch (error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async createOperatorLegal(operatorLegal: OperatorLegalDto): Promise<Response>{
        const newOperator = this.models.OperatorLegal
        try{
            const operator = await newOperator.schema.methods.CreateOperator(operatorLegal)
            const profileOperator = await this.createProfile(this.map.toProfileBaseDto(operator)) as any
            if(profileOperator.isRight()){
                this.updateOperator(profileOperator.value.getValue(), operator)
            }            
            return right(Result.ok<any>(operator)) as Response                                 
        } catch (error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }        
    }
    public async getAll(): Promise<Response> {
        try{
            const operators = await this.models.OperatorBase.find()
            if(operators.length > 0){
                let viewOperators: any[] = []
                operators.forEach((element: any) => {
                    viewOperators.push(this.map.toViewOperatorDto(element))
                })
                return right(Result.ok<any>(viewOperators)) as Response
            } else {
                return left(new GenericAppError.NotFoundError()) as Response
            }
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async getById(id: string): Promise<Response> {
        try{
            const operator = await this.models.OperatorBase.findById(id)
            if(operator){
                let viewProfile: any;                
                switch(operator.typeOperator){
                    case MongoMessages.operatorDiscriminator.natural:
                        viewProfile = this.map.toViewNaturalOperatorDto(operator)
                    break
                    case MongoMessages.operatorDiscriminator.legal:                        
                        viewProfile = this.map.toViewLegalOperatorDto(operator)
                    break
                    default:
                        return left(new GenericAppError.NotFoundError()) as Response
                    break
                }
                return right(Result.ok<any>(viewProfile)) as Response
            } else {
                return left(new GenericAppError.NotFoundError()) as Response
            }
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async updateOperatorPic(id: string, url: string): Promise<Response> {
        try{      
            const newOperator = this.models.OperatorBase
            const idUpdated = await newOperator.schema.methods.UpdateOperatorPicture(id, url)
            if(idUpdated){            
                return right(Result.ok<any>(id)) as Response
            } else {
                return left(new OperatorErrors.OperatorDoesNotExists()) as Response
            }
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }    
    public async updateOperatorAddress(id: string, address: AddressDto): Promise<Response> {
        try{      
            const newOperator = this.models.OperatorBase
            const idUpdated = await newOperator.schema.methods.AddUpdateAddress(id, address)
            if(idUpdated){            
                return right(Result.ok<any>(id)) as Response
            } else {
                return left(new OperatorErrors.OperatorDoesNotExists()) as Response
            }
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async toggleApproveOperator(id: string): Promise<Response>{
        const operator = this.models.OperatorBase
        try{
            const toggleActive = await operator.schema.methods.toggleApproved(id)
            return right(Result.ok<any>(toggleActive)) as Response
        } catch (error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }

    //HELPERS
    public async createProfile(profileOperator: ProfileOperatorDto){
        try{
            const profileService = new ProfileService()
            return await profileService.CreateProfileOperator(profileOperator)
        } catch(e) {
            return left(new GenericAppError.UnexpectedError(e)) as Response
        }
    }
    public async updateOperator(idProfileOperator: string, idOperator: string): Promise<Response> {
        try{
        const operator = await this.models.OperatorBase.findById(idOperator)
        if(operator){
            operator.operatorProfile = idProfileOperator
            operator.lastUpdate = Date.now()
            operator.save()
            return right(Result.ok<any>()) as Response
        } else {
            return left(new OperatorErrors.OperatorDoesNotExists()) as Response
        }
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }    
}