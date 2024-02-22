import Mongoose from 'mongoose'

import { Config } from '../../config'
import { MongoMessages } from '../constants/mongo.messages'

// Models
import { User } from './schemas/user'
import { ProfileBase } from './schemas/profileBase'
import { ProfileOperator } from './schemas/profileOperator'
import { ProfilePartner } from './schemas/profilePartner'
import { ProfileClient } from './schemas/profileClient'
import { PermissionRole } from './schemas/permissionRole'
import { BlueSpot } from './schemas/blueSpot'
import { Country } from './countries/country'
import { Colombia } from './countries/colombia'
import { Client } from './schemas/client'
import { InspectionCategory } from './schemas/inspectionCategory'
import { InspectionCategoryItem } from './schemas/inspectionCategoryItem'
import { ActivityVerify } from './schemas/activityVerify'
import { ConditionRisk } from './schemas/conditionRisk'
import { TypesList } from './schemas/typesList'
import { TasksList } from './schemas/taskList'
import { Protocol } from './schemas/protocol'
import { ScheduleProtocolClient } from './schemas/scheduleProtocolClient'
import { RiskTypes } from './schemas/riskTypes'
import { BussinesType } from './schemas/businessType'
import { BranchOffice } from './schemas/branchOffice'
import { TypeCompany } from './schemas/typesCompany'
import { Audit } from './schemas/audit'
import { ReputationalImpact } from './schemas/reputationalImpact'
import { PlanAction } from './schemas/planAction'
import { Evidence } from './schemas/evidence'
import { OperatorBase } from './schemas/operatorBase'
import { OperatorLegal } from './schemas/operatorLegal'
import { OperatorNatural } from './schemas/operatorNatural'
import { KeyValue } from './schemas/keyValue'

const connectDb = () => {    
    return Mongoose.connect(`${Config.urlDatabase}`, {
        
    })
    .catch(error => console.log({
        description: MongoMessages.msj.connectionError,
        stringConnection: Config.urlDatabase,
        error: error
    }));
}

const models = {
    User,
    ProfileBase,
    ProfileOperator,
    ProfileClient,    
    ProfilePartner,
    PermissionRole,
    BlueSpot,
    Country,
    Colombia,    
    Client,
    InspectionCategory,
    InspectionCategoryItem,
    ActivityVerify,
    ConditionRisk,
    TypesList,
    TasksList,
    Protocol,
    ScheduleProtocolClient,
    RiskTypes,
    BussinesType,
    BranchOffice,
    TypeCompany,
    Audit,
    ReputationalImpact,
    PlanAction,
    Evidence,
    OperatorBase,
    OperatorLegal,
    OperatorNatural,
    KeyValue
};

export { connectDb, models };