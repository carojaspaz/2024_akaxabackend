import * as express from 'express';
import { auth } from '../../../core'
import {
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
    getResultAuditByScheduleController,
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
    getAllSchedulesProtocolByVerifyController
} from '../controllers'

const multer = require('multer')
const upload = multer({ dest: 'src/uploads'})

const protocolRouter = express.Router()

protocolRouter.post('/protocol/', auth,
    (req, res) => createProtocolController.execute(req, res))

protocolRouter.put('/protocol/:id', auth,
    (req, res) => updateProtocolController.execute(req, res))

protocolRouter.get('/protocol/', auth,
    (req, res) => getAllNameIdProtocolController.execute(req, res))

protocolRouter.get('/protocol/:id', auth,
    (req, res) => getAllProtocolController.execute(req, res))

protocolRouter.post('/protocol/ciiu/name/', auth,
    (req, res) => getAllProtocolByCUIIController.execute(req, res))

protocolRouter.post('/protocol/ciiu/', auth,
    (req, res) => getProtocolController.execute(req, res))

protocolRouter.post('/protocol/schedule/', auth,
    (req, res) => createScheduleAuditProtocolController.execute(req, res))

protocolRouter.get('/protocol/schedule/all/', auth,
    (req, res) => getAllSchedulesProtocolController.execute(req, res))

protocolRouter.get('/protocol/schedule/byId/:id', auth,
    (req, res) => getScheduleProtocolByIdController.execute(req, res))

protocolRouter.get('/protocol/schedule/byAuditor/:id', auth,
    (req, res) => getAllSchedulesProtocolByAuditorController.execute(req, res))

protocolRouter.get('/protocol/schedule/byVerify/:id', auth,
    (req, res) => getAllSchedulesProtocolByVerifyController.execute(req, res))

protocolRouter.get('/protocol/schedule/byOperator/:id', auth,
    (req, res) => getAllSchedulesProtocolByOperatorController.execute(req, res))

protocolRouter.get('/protocol/schedule/byClient/:id', auth,
    (req, res) => getAllSchedulesProtocolByClientController.execute(req, res))

protocolRouter.patch('/protocol/schedule/updateStatus/:id/:newStatus', auth,
    (req, res) => updateStatusScheduleProtocolController.execute(req, res))

protocolRouter.get('/protocol/audit/:id', auth,
    (req, res) => createProtocolByIdController.execute(req, res))

protocolRouter.put('/protocol/audit/:id', auth,
    (req, res) =>  updateAuditController.execute(req, res))

protocolRouter.put('/protocol/audit/finish/:id', auth,
    (req, res) => finishAuditController.execute(req, res))
    
protocolRouter.get('/protocol/audit/evaluation/:id', auth,
    (req, res) => getResultAuditController.execute(req, res))

protocolRouter.get('/protocol/audit/evaluation/bySchedule/:id', auth,
    (req, res) => getResultAuditByScheduleController.execute(req, res))


protocolRouter.get('/protocol/audit/reputationalImpact/getAll/', auth,
    (req, res) => getAllReputationalImpactsController.execute(req, res))

protocolRouter.get('/audit/planAction/:id', auth,
    (req, res) => getPlanActionController.execute(req, res))

protocolRouter.post('/audit/planAction/:id', auth,
    (req, res) => updatePlanActionController.execute(req, res))

protocolRouter.get('/audit/', auth,
    (req, res) => getAllAuditsController.execute(req, res))

protocolRouter.get('/audit/:id', auth,
    (req, res) => getAllAuditsByClientController.execute(req, res))

protocolRouter.get('/audit/client/:id', auth,
    (req, res) => getAllAuditsByProfileClientController.execute(req, res))

protocolRouter.post('/audit/item/evidence/:audit/:category/:item', auth, upload.single('evidence'),
    (req, res) => uploadEvidenceController.execute(req, res))

protocolRouter.get('/audit/evidence/:audit', auth, upload.single('evidence'),
    (req, res) => getEvidenceAuditController.execute(req, res))

protocolRouter.get('/audit/item/evidence/:audit/:category/:item', auth,
    (req, res) => getEvidenceByItemAuditController.execute(req, res))


export { protocolRouter }