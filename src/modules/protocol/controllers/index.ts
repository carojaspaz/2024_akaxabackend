import { CreateProtocolController } from './create.protocol.controller'
import { GetAllProtocolController } from './get.all.protocol.controller'
import { GetAllNameIdProtocolController } from './get.all.name.id.protocol.controller'
import { GetProtocolController } from './get.protocols.controller'
import { CreateScheduleAuditProtocolController } from './create.schedule.audit.protocol.controller'
import { GetAllSchedulesProtocolController } from './get.all.schedules.protocol.controller'
import { GetAllSchedulesProtocolByClientController } from './get.all.schedules.protocol.by.client.controller'
import { GetAllSchedulesProtocolByAuditorController } from './get.all.schedules.protocol.by.auditor.controller'
import { GetScheduleProtocolByIdController } from './get.schedule.protocol.by.id.controller'
import { UpdateStatusScheduleProtocolController } from './update.status.schedule.protocol.controller'
import { UpdateProtocolController } from './update.protocol.controller'
import { CreateProtocolByIdController } from './create.protocol.audit.controller'
import { GetAllProtocolByCUIIController } from './get.all.protocol.by.cuii.controller'
import { UpdateAuditController } from './update.audit.controller'
import { FinishAuditController } from './finish.audit.controller'
import { GetResultAuditController } from './get.result.audit.controller'
import { GetAllReputationalImpactsController } from './get.all.reputational.impacts.controller'
import { GetPlanActionController } from './get.plan.action.controller'
import { UpdatePlanActionController } from './update.plan.action.controller'
import { GetAllAuditsController } from './get.all.audits.controller'
import { GetAllAuditsByClientController } from './get.all.audits.by.client.controller'
import { GetAllAuditsByProfileClientController } from './get.all.audits.by.profile.client.controller'
import { UploadEvidenceController } from './upload.evidence.audit.controller'
import { GetEvidenceAuditController } from './get.evidence.by.audit.controller'
import { GetEvidenceByItemAuditController } from './get.evidence.by.item.audit.controller'
import { GetAllSchedulesProtocolByOperatorController } from  './get.all.schedules.protocol.by.operator.controller'
import { GetAllSchedulesProtocolByVerifyController } from './get.all.schedules.protocol.by.verify.controller'
import { GetResultAuditByScheduleController } from './get.result.audit.by.schedule.controller'


import { ProtocolService } from '../services/protocol.service'

const protocolService = new ProtocolService()

const createProtocolController = new CreateProtocolController(protocolService)
const getAllProtocolController = new GetAllProtocolController(protocolService)
const getAllNameIdProtocolController = new GetAllNameIdProtocolController(protocolService)
const getProtocolController = new GetProtocolController(protocolService)
const createScheduleAuditProtocolController = new CreateScheduleAuditProtocolController(protocolService)
const getAllSchedulesProtocolController = new GetAllSchedulesProtocolController(protocolService)
const getAllSchedulesProtocolByClientController = new GetAllSchedulesProtocolByClientController(protocolService)
const getAllSchedulesProtocolByAuditorController = new GetAllSchedulesProtocolByAuditorController(protocolService)
const getScheduleProtocolByIdController = new GetScheduleProtocolByIdController(protocolService)
const updateStatusScheduleProtocolController = new UpdateStatusScheduleProtocolController(protocolService)
const updateProtocolController = new UpdateProtocolController(protocolService)
const createProtocolByIdController = new CreateProtocolByIdController(protocolService)
const getAllProtocolByCUIIController = new GetAllProtocolByCUIIController(protocolService)
const updateAuditController = new UpdateAuditController(protocolService)
const finishAuditController = new FinishAuditController(protocolService)
const getResultAuditController = new GetResultAuditController(protocolService)
const getAllReputationalImpactsController = new GetAllReputationalImpactsController(protocolService)
const getPlanActionController = new GetPlanActionController(protocolService)
const updatePlanActionController = new UpdatePlanActionController(protocolService)
const getAllAuditsController = new GetAllAuditsController(protocolService)
const getAllAuditsByClientController = new GetAllAuditsByClientController(protocolService)
const getAllAuditsByProfileClientController = new GetAllAuditsByProfileClientController(protocolService)
const uploadEvidenceController = new UploadEvidenceController(protocolService)
const getEvidenceAuditController = new GetEvidenceAuditController(protocolService)
const getEvidenceByItemAuditController = new GetEvidenceByItemAuditController(protocolService)
const getAllSchedulesProtocolByOperatorController = new GetAllSchedulesProtocolByOperatorController(protocolService)
const getAllSchedulesProtocolByVerifyController = new GetAllSchedulesProtocolByVerifyController(protocolService)
const getResultAuditByScheduleController = new GetResultAuditByScheduleController(protocolService)

export {
    createProtocolController,
    getAllProtocolController,
    getAllNameIdProtocolController,
    getProtocolController,
    createScheduleAuditProtocolController,
    getAllSchedulesProtocolController,
    getAllSchedulesProtocolByClientController,
    getAllSchedulesProtocolByAuditorController,
    updateStatusScheduleProtocolController,
    getScheduleProtocolByIdController,
    updateProtocolController,
    createProtocolByIdController,
    getAllProtocolByCUIIController,
    updateAuditController,
    finishAuditController,
    getResultAuditController,
    getAllReputationalImpactsController,
    getPlanActionController,
    updatePlanActionController,
    getAllAuditsController,
    getAllAuditsByClientController,
    getAllAuditsByProfileClientController,
    uploadEvidenceController,
    getEvidenceAuditController,
    getEvidenceByItemAuditController,
    getAllSchedulesProtocolByOperatorController,
    getAllSchedulesProtocolByVerifyController,
    getResultAuditByScheduleController
}