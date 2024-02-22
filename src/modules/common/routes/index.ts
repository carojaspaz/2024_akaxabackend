import * as express from 'express';
import { auth } from '../../../core';

import { 
    getCountriesController,
    getCountriesActivesController,
    getMunicipalitiesStateController,
    getPopulateCenterMunicipalityController,
    getStatesCountryController,
    getParameterController, 
    getParameterByCodeController,
    getCiiuController,
    getCiiuDivisionController,
    getCiiuDivisionSubdivisionController,
    getCiiuDivisionSubdivisionActivitiesController,
    getActivityVerifyController,
    getConditionRiskController,
    getTypesListController,
    getCiiuActivityController,
    getRiskTypesController,
    createCompanyTypeController,
    updateCompanyTypeController,
    getAllCompanytypesController,
    sendMailController,
    createActivityVerifyController,
    toggleActivityVerifyController,
    healtyCheckController
 } from '../controllers'

const commonRouter = express.Router();

commonRouter.get('/healtyCheck/',
    (req, res) => healtyCheckController.execute(req, res))

commonRouter.get('/countries/',
    (req, res) => getCountriesController.execute(req, res))

commonRouter.get('/countries/active/',
    (req, res) => getCountriesActivesController.execute(req, res))

commonRouter.get('/countries/states/:countryCode',
    (req, res) => getStatesCountryController.execute(req, res))

commonRouter.get('/countries/states/municipalities/:stateCode',
    (req, res) => getMunicipalitiesStateController.execute(req, res))

commonRouter.get('/countries/states/municipalities/populate/:municipalityCode',
    (req, res) => getPopulateCenterMunicipalityController.execute(req, res))

commonRouter.get('/parameters/', auth, 
    (req, res) => getParameterController.execute(req, res))

commonRouter.get('/parameters/:code', auth, 
    (req, res) => getParameterByCodeController.execute(req, res))

commonRouter.get('/ciiu/', 
    (req, res) => getCiiuController.execute(req, res))

commonRouter.get('/ciiu/:section/', 
    (req, res) => getCiiuDivisionController.execute(req, res))

commonRouter.get('/ciiu/:section/:division/', 
    (req, res) => getCiiuDivisionSubdivisionController.execute(req, res))

commonRouter.get('/ciiu/:section/:division/:subdivision/', 
    (req, res) => getCiiuDivisionSubdivisionActivitiesController.execute(req, res))

commonRouter.get('/ciiu/:section/:division/:subdivision/:activity/', 
    (req, res) => getCiiuActivityController.execute(req, res))

commonRouter.post('/checklist/activityVerify/create', 
    (req, res) => createActivityVerifyController.execute(req, res))

commonRouter.get('/checklist/activityVerify/toggle/:id', 
    (req, res) => toggleActivityVerifyController.execute(req, res))

commonRouter.get('/checklist/activityVerify/', 
    (req, res) => getActivityVerifyController.execute(req, res))

commonRouter.get('/checklist/conditionsRisk/',
    (req, res) => getConditionRiskController.execute(req, res))

commonRouter.get('/checklist/typesList/',
    (req, res) => getTypesListController.execute(req, res))

commonRouter.get('/risk/typesList/',
    (req, res) => getRiskTypesController.execute(req, res))

commonRouter.post('/company/types/', auth,
    (req, res) => createCompanyTypeController.execute(req, res))
    
commonRouter.put('/company/types/:id', auth,
    (req, res) => updateCompanyTypeController.execute(req, res))

commonRouter.get('/company/types/', auth,
    (req, res) => getAllCompanytypesController.execute(req, res))

commonRouter.post('/sendMail/', auth,
    (req, res) => sendMailController.execute(req, res))

commonRouter.post('/sendTestMail/',
    (req, res) => sendMailController.execute(req, res))

export { commonRouter };