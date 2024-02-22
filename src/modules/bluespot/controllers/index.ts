import { GetAllBlueSpotsController } from './get.all.blue.spots.controller'
import { GetByIdBlueSpotController  } from './get.by.id.blue.spot.controller'
import { GetTopCitiesBlueSpotsController } from './get.top.cities.blue.spot.controller'

import { BlueSpotService } from '../services/bluespot.service'
const blueSpotService = new BlueSpotService()

const getAllBlueSpotsController = new GetAllBlueSpotsController(blueSpotService)
const getByIdBlueSpotController = new GetByIdBlueSpotController(blueSpotService)
const getTopCitiesBlueSpotsController = new GetTopCitiesBlueSpotsController(blueSpotService)


export {
    getAllBlueSpotsController,
    getByIdBlueSpotController,
    getTopCitiesBlueSpotsController
}