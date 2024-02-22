import { GetCountriesController } from './get.countries.controller'
import { GetCountriesActivesController } from './get.countries.actives.controller'
import { GetStatesCountryController } from './get.states.country.controller'
import { GetMunicipalitiesStateController } from './get.municipalities.state.controller'
import { GetPopulateCenterMunicipalityController } from './get.populate.center.municipality.controller'
import { GetParameterController } from './get.parameter.controller'
import { GetParameterByCodeController } from './get.parameter.by.code.controller'
import { GetCiiuController } from './get.ciiu.controller'
import { GetCiiuDivisionController } from './get.ciiu.division.controller'
import { GetCiiuDivisionSubdivisionController } from './get.ciiu.division.subdivision.controller'
import { GetCiiuDivisionSubdivisionActivitiesController } from './get.ciiu.division.subdivision.activities.controller'
import { GetActivityVerifyController } from './get.activity.verify.controller'
import { GetConditionRiskController } from './get.conditions.risk.controller'
import { GetTypesListController } from './get.types.list.controller'
import { GetCiiuActivityController } from './get.ciiu.activity.controller'
import { GetRiskTypesController } from './get.risk.types.controller'
import { CreateCompanyTypeController } from './create.company.type.controller'
import { UpdateCompanyTypeController } from './update.company.type.controller'
import { GetAllCompanytypesController } from './get.all.company.types.controller'
import { SendMailController } from './send.mail.controller'

import { HealtyCheckController } from './healty.check.controller'

import { CreateActivityVerifyController } from './create.activity.verify.controller'
import { ToggleActivityVerifyController } from './toggle.activity.verify.controller'

import { CommonService } from '../services/common.service'

const commonService = new CommonService()

const getCountriesController = new GetCountriesController(commonService)
const getCountriesActivesController = new GetCountriesActivesController(commonService)
const getStatesCountryController = new GetStatesCountryController(commonService)
const getMunicipalitiesStateController = new GetMunicipalitiesStateController(commonService)
const getPopulateCenterMunicipalityController = new GetPopulateCenterMunicipalityController(commonService)
const getParameterController = new GetParameterController(commonService)
const getParameterByCodeController = new GetParameterByCodeController(commonService)
const getCiiuController = new GetCiiuController(commonService)
const getCiiuDivisionController = new GetCiiuDivisionController(commonService)
const getCiiuDivisionSubdivisionController = new GetCiiuDivisionSubdivisionController(commonService)
const getCiiuDivisionSubdivisionActivitiesController = new GetCiiuDivisionSubdivisionActivitiesController(commonService)
const getActivityVerifyController = new GetActivityVerifyController(commonService)
const getConditionRiskController = new GetConditionRiskController(commonService)
const getTypesListController = new GetTypesListController(commonService)
const getCiiuActivityController = new GetCiiuActivityController(commonService)
const getRiskTypesController = new GetRiskTypesController(commonService)
const createCompanyTypeController = new CreateCompanyTypeController(commonService)
const updateCompanyTypeController = new UpdateCompanyTypeController(commonService)
const getAllCompanytypesController = new GetAllCompanytypesController(commonService)
const sendMailController = new SendMailController(commonService)
const createActivityVerifyController = new CreateActivityVerifyController(commonService)
const toggleActivityVerifyController = new ToggleActivityVerifyController(commonService)
const healtyCheckController = new HealtyCheckController()

export {
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
}