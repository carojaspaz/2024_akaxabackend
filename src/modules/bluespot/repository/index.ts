
import { BlueSpotErrors } from './bluespot.repository.error';
import { BlueSpotRepository } from './bluespot.repository';
import { models } from '../../../core';


const bluespotRepository = new BlueSpotRepository(models);

export {
    bluespotRepository,
    BlueSpotErrors
}