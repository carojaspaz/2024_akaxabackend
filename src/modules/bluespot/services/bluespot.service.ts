import { bluespotRepository } from '../repository'

export class BlueSpotService {
    async getAllBlueSpots():Promise<any>{
        return await bluespotRepository.getAllBlueSpot()
    }
    async getBlueSpotById(id: number):Promise<any>{
        return await bluespotRepository.getByIdBlueSpot(id)
    }
    async getTopCities(): Promise<any>{
        return await bluespotRepository.getTopCities()
    }
}