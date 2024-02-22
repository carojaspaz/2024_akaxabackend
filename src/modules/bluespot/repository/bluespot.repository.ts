import { Either, GenericAppError, Result, left, right} from '../../../core'

import { BlueSpotErrors } from './bluespot.repository.error'

type Response = Either<
    GenericAppError.UnexpectedError |
    BlueSpotErrors.NotFound |
    Result<any>,    
    Result<void>>

export interface IBlueSpotRepo {
    getAllBlueSpot(): Promise<Response>
    getByIdBlueSpot(id: number): Promise<Response>
    getTopCities(): Promise<Response>
}

export class BlueSpotRepository implements IBlueSpotRepo {
    private models: any;

    constructor(models: any){
        this.models = models;
    }

    async getAllBlueSpot(): Promise<Response> {
        const blueSpot = this.models.BlueSpot
        if(blueSpot.length == 0){
            return left(new BlueSpotErrors.NotFound())
        }
        try{
            const res = await blueSpot.find({});
            return right(Result.ok<any>(res)) as Response
        }catch(e){
            return left(new GenericAppError.UnexpectedError(e)) as Response
        }
    }

    async getByIdBlueSpot(id: number): Promise<Response> {
        const blueSpot = this.models.BlueSpot
        try{
            var query = { id: id }
            const res = await blueSpot.find(query)
            if(res.length == 0){
                return left(new BlueSpotErrors.NotFound())
            }
            return right(Result.ok<any>(res)) as Response
        } catch(e){
            return left(new GenericAppError.UnexpectedError(e)) as Response
        }
    }

    async getTopCities(): Promise<Response>{
        try{
            let topCities: any[] = []
            topCities.push({"city": "Medellín", "total": 20})
            topCities.push({"city": "Bogotá", "total": 15})
            topCities.push({"city": "Pasto", "total": 10})
            return right(Result.ok<any>(topCities)) as Response
        } catch(e){
            return left(new GenericAppError.UnexpectedError(e)) as Response
        }
    }
}