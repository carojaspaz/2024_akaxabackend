import * as express from 'express';

// Import routers
import { 
    commonRouter, 
    userRouter, 
    operatorRouter,
    profileRouter,
    bluespotRouter,
    clientRouter,
    inspectionCategoryRouter,
    protocolRouter } from '../../../modules';

const router = express.Router();

router.use('/v1',   
    commonRouter,
    userRouter,
    operatorRouter,
    profileRouter,
    bluespotRouter,
    clientRouter,
    inspectionCategoryRouter,
    protocolRouter
);
export { router };