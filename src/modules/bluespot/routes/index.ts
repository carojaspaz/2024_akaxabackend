import * as express from 'express';
import { auth } from '../../../core';
import { 
    getAllBlueSpotsController, 
    getByIdBlueSpotController,
    getTopCitiesBlueSpotsController
} from '../controllers';

const bluespotRouter =  express.Router();

bluespotRouter.get('/bluespot/topCities', auth,
    (req, res) => getTopCitiesBlueSpotsController.execute(req, res));

bluespotRouter.get('/bluespot/all/', auth,
    (req, res) => getAllBlueSpotsController.execute(req, res));

bluespotRouter.get('/bluespot/:id', auth,
    (req, res) => getByIdBlueSpotController.execute(req, res));

export { bluespotRouter };