import { ProtocolErrors } from './protocol.repository.errors'
import { Either, GenericAppError, Result, left, right, logType, translate } from '../../../core'
import { writeLog } from '../../../logger'
import { ProtocolMap } from '../mappers/protocolMap';
import { ProtocolDto, CIUUFilterDto, ProtocolViewDto, ProtocolClientDto, ProtocolUpdateDto } from '../dtos'

type Response = Either<
    GenericAppError.UnexpectedError | 
    GenericAppError.NotFoundError |  
    ProtocolErrors.ProtocolAlreadyExists |  
    ProtocolErrors.ProtocolScheduleNotAvailable |
    Result<any>,   
    Result<void>>

export interface IProtocolRepo {      
    save(protocol: ProtocolDto): Promise<Response>
    saveScheduleProtocolClient(protocolClient: ProtocolClientDto): Promise<Response>
    getAllById(id: string): Promise<Response>
    getProtocolsFilter(ciuu: CIUUFilterDto): Promise<Response>
    getAllNamedIdProtocolsByCuii(filter?: CIUUFilterDto): Promise<Response>   
    getAllNameIdProtocols(): Promise<Response>
    getAllSchedules(): Promise<Response>
    getAllSchedulesByAuditor(id: string): Promise<Response>
    getAllSchedulesByVerify(id: string): Promise<Response>
    getAllSchedulesByOperator(id: string): Promise<Response>
    getAllSchedulesByClient(id: string): Promise<Response>
    getScheduleById(id: string): Promise<Response>
    updateScheduleStatus(idSchedule: string, newStatus: string): Promise<Response>
    updateProcotol(id: string, protocol: ProtocolUpdateDto): Promise<Response>
    generateProtocolToAudit(id: string): Promise<Response>
    updateAudit(id: string, results: any, isDone: boolean): Promise<Response>
    getEvaluation(id: string): Promise<Response>
    getEvaluationBySchedule(id: string): Promise<Response>
    getReputationalImpactOptions(): Promise<Response>
    getPlanAction(id: string): Promise<Response>
    updatePlanAction(id: string, planAction: any): Promise<Response>
    getAllAudits(): Promise<Response>
    getAllAuditsByClient(id: string): Promise<Response>
    getAllAuditsByProfileClient(id: string): Promise<Response>
    saveEvidence(auditId: string, categoryId: string, itemId: string, url: string): Promise<Response>
    getEvidence(auditId: string): Promise<Response>
    getEvidenceByItem(auditId: string, categoryId: string, itemId: string): Promise<Response>
    getProjectsByOperator(operatorId: string): Promise<Response>
}

export class ProtocolRepository implements IProtocolRepo {
    private map: ProtocolMap
    private models: any
    private removeId = { "_id": 0 }

    constructor(models: any){
        this.models = models
        this.map = new ProtocolMap()
    }                 
    public async getAllNamedIdProtocolsByCuii(ciuu?: CIUUFilterDto): Promise<Response> {
        try{     
            var query: any = {}
            if(ciuu.sector) { query = {...query, 'CIIU.sector': ciuu.sector }}
            if(ciuu.division) { query = {...query, 'CIIU.division': ciuu.division }}
            if(ciuu.subdivision) { query = {...query, 'CIIU.subdivision': ciuu.subdivision }}
            if(ciuu.activity) { query = {...query, 'CIIU.activity': ciuu.activity }}
            const protocols = await this.models.Protocol.find( query ,{'name':1})
            if(protocols.length > 0){
                let viewProtocols: any[] = []
                protocols.forEach((element: any) => {
                    let protocol =  this.map.toViewNameIdProtocol(element)
                    viewProtocols.push(protocol)
                })
                return right(Result.ok<any>(viewProtocols)) as Response            
            } else {
                return left(new GenericAppError.NotFoundError()) as Response                
            }            
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async getAllNameIdProtocols(): Promise<Response> {
        try{            
            const protocols = await this.models.Protocol.find({},{'name':1})
            if(protocols.length > 0){
                let viewProtocols: any[] = []
                protocols.forEach((element: any) => {
                    let protocol =  this.map.toViewNameIdProtocol(element)
                    viewProtocols.push(protocol)
                })
                return right(Result.ok<any>(viewProtocols)) as Response            
            } else {
                return left(new GenericAppError.NotFoundError()) as Response                
            }            
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async getReputationalImpactOptions(): Promise<Response> {
        try{            
            const reputational = await this.models.ReputationalImpact.find({},{'impact':1})
            if(reputational.length > 0){
                let viewImpacts: any[] = reputational.map((r:any)=>{
                    return {
                        id: r._id,
                        impact: r.impact
                    }
                })
                return right(Result.ok<any>(viewImpacts)) as Response            
            } else {
                return left(new GenericAppError.NotFoundError()) as Response                
            }            
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async getAllById(id: string): Promise<Response> {        
        try{             
            const conditions = await this.models.ConditionRisk.find()           
            const protocol = await this.models.Protocol.findById(id)            
            .populate('categories.idCategory', '_id subject')            
            .populate('categories.items.idCategoryItem', '_id subject item value conditionRisk')
            .exec()         
            if(protocol){                
                let protocolView =  this.map.toViewProtocol(protocol, conditions)
                return right(Result.ok<any>(protocolView)) as Response            
            } else {
                return left(new GenericAppError.NotFoundError()) as Response                
            }            
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }    
    public async getProtocolsFilter(ciuu: CIUUFilterDto): Promise<Response> {
        try{         
            var query: any = {}
            if(ciuu.sector) { query = {...query, 'CIIU.sector': ciuu.sector }}
            if(ciuu.division) { query = {...query, 'CIIU.division': ciuu.division }}
            if(ciuu.subdivision) { query = {...query, 'CIIU.subdivision': ciuu.subdivision }}
            if(ciuu.activity) { query = {...query, 'CIIU.activity': ciuu.activity }}
            const protocols = await this.models.Protocol.find(query)
            .populate('categories.idCategory', 'subject evaluationType')            
            .populate('categories.items.idCategoryItem', 'subject item value conditionRisk')
            .exec()         
            if(protocols.length > 0){
                const conditions = await this.models.ConditionRisk.find()
                let protocolsView: ProtocolViewDto[] = []
                protocols.forEach((element: any) => {
                    const protocol = this.map.toViewProtocol(element, conditions)
                    protocolsView.push(protocol)
                });                
                return right(Result.ok<any>(protocolsView)) as Response            
            } else {
                return left(new GenericAppError.NotFoundError()) as Response                
            }            
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async save(protocol: ProtocolDto): Promise<Response> {
        const newProtocol = this.models.Protocol
        try{
            const rawProtocol = this.map.toPersistence(protocol)
            const id = await newProtocol.schema.methods.CreateProtocol(rawProtocol)
            return right(Result.ok<any>(id)) as Response            
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async updateProcotol(id: string, protocol: ProtocolUpdateDto): Promise<Response> {
        const newProtocol = this.models.Protocol
        try{            
            const rawProtocol = this.map.toUpdatePersistence(protocol)
            const updatedId = await newProtocol.schema.methods.UpdateProtocol(id, rawProtocol)
            return right(Result.ok<any>(updatedId)) as Response            
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async saveScheduleProtocolClient(protocolClient: ProtocolClientDto): Promise<Response> {
        const newSchedule = this.models.ScheduleProtocolClient
        try{
            const availableAuditorSchedule = await this.validateAvailabilityAuditor(protocolClient.schedule.scheduleStartDate,protocolClient.schedule.scheduleEndDate,protocolClient.schedule.auditor)
            if(availableAuditorSchedule){
            const rawSchedule = this.map.toPersistenceSchedule(protocolClient)
            const id = await newSchedule.schema.methods.CreateSchedule(rawSchedule)            
            const audit = await this.generateProtocolToAuditBySchedule(rawSchedule, protocolClient.protocol, id)
            const newAudit = this.models.Audit
            newAudit.schema.methods.CreateAudit(audit)
            return right(Result.ok<any>(id)) as Response            
            } else {
                return left(new ProtocolErrors.ProtocolScheduleNotAvailable()) as Response                
            }
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async getAllSchedules(): Promise<Response> {
        try{                         
            const schedules = await this.models.ScheduleProtocolClient.find()
            .populate('client')
            .populate('branchOffice')
            .populate('protocol', '_id, name')
            .populate('auditor')
            .exec()         
            if(schedules){                                
                let protocolSchedulesView: any[] = []
                schedules.forEach((element: any) => {
                    protocolSchedulesView.push(this.map.toViewScheduleProtocol(element))
                })
                return right(Result.ok<any>(protocolSchedulesView)) as Response            
            } else {
                return left(new GenericAppError.NotFoundError()) as Response                
            }            
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async getAllSchedulesByAuditor(id: string): Promise<Response> {
        try{                         
            const schedules = await this.models.ScheduleProtocolClient.find({auditor: id})
            .populate('client')
            .populate('branchOffice')
            .populate('protocol', '_id, name')
            .populate('auditor')
            .populate('verify')
            .populate('operator')
            .exec()         
            if(schedules){                                
                let protocolSchedulesView: any[] = []
                schedules.forEach((element: any) => {
                    protocolSchedulesView.push(this.map.toViewScheduleProtocol(element))
                })
                return right(Result.ok<any>(protocolSchedulesView)) as Response            
            } else {
                return left(new GenericAppError.NotFoundError()) as Response                
            }            
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async getAllSchedulesByVerify(id: string): Promise<Response> {
        try{                         
            const schedules = await this.models.ScheduleProtocolClient.find({verify: id})
            .populate('client')
            .populate('branchOffice')
            .populate('protocol', '_id, name')
            .populate('auditor')
            .populate('verify')
            .exec()         
            if(schedules){                                
                let protocolSchedulesView: any[] = []
                schedules.forEach((element: any) => {
                    protocolSchedulesView.push(this.map.toViewScheduleProtocol(element))
                })
                return right(Result.ok<any>(protocolSchedulesView)) as Response            
            } else {
                return left(new GenericAppError.NotFoundError()) as Response                
            }            
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async getAllSchedulesByOperator(id: string): Promise<Response> {
        try{                         
            const schedules = await this.models.ScheduleProtocolClient.find({operator: id})
            .populate('client')
            .populate('branchOffice')
            .populate('protocol', '_id, name')
            .populate('auditor')
            .populate('verify')
            .exec()         
            if(schedules){                                
                let protocolSchedulesView: any[] = []
                schedules.forEach((element: any) => {
                    protocolSchedulesView.push(this.map.toViewScheduleProtocol(element))
                })
                return right(Result.ok<any>(protocolSchedulesView)) as Response            
            } else {
                return left(new GenericAppError.NotFoundError()) as Response                
            }            
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async getAllSchedulesByClient(id: string): Promise<Response> {
        try{                         
            const schedules = await this.models.ScheduleProtocolClient.find({client: id})
            .populate('client')
            .populate('protocol', '_id, name')
            .populate('auditor')
            .populate('verify')
            .exec()         
            if(schedules){                                
                let protocolSchedulesView: any[] = []
                schedules.forEach((element: any) => {
                    protocolSchedulesView.push(this.map.toViewScheduleProtocol(element))
                })
                return right(Result.ok<any>(protocolSchedulesView)) as Response            
            } else {
                return left(new GenericAppError.NotFoundError()) as Response                
            }            
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async getScheduleById(id: string): Promise<Response> {
        try{                         
            const schedule = await this.models.ScheduleProtocolClient.findById(id)
            .populate('client')
            .populate('protocol', '_id, name')
            .populate('auditor')
            .populate('verify')
            .populate('operator')
            .exec()         
            if(schedule){                                
                let schedulesView = this.map.toViewScheduleProtocol(schedule)                
                return right(Result.ok<any>(schedulesView)) as Response            
            } else {
                return left(new GenericAppError.NotFoundError()) as Response                
            }            
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async updateScheduleStatus(idSchedule: string, newStatus: string): Promise<Response>{
        const newSchedule = this.models.ScheduleProtocolClient
        try{            
            const id = await newSchedule.schema.methods.UpdateStatus(idSchedule, newStatus)
            return right(Result.ok<any>(id)) as Response            
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async generateProtocolToAudit(id: string): Promise<Response> {        
        try{             
            const audit = await this.models.Audit.findOne({schedule: id})
            .populate('client')
            .populate('branchOffice')
            .populate('auditor')
            .populate('verify')
            .populate('operator')
            .populate('schedule')
            .exec()
            if(audit){                
                if(audit.status === 'Assigned'){
                    this.models.ScheduleProtocolClient.schema.methods.UpdateStatus(id, 'InProcess')
                }
                this.models.Audit.schema.methods.StartAudit(audit._id)
                let viewAudit =  this.map.toViewProtocolAudit(audit)
                return right(Result.ok<any>(viewAudit)) as Response            
            } else {
                return left(new GenericAppError.NotFoundError()) as Response                
            }            
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }       
    public async updateAudit(id: string, results: any, isDone: boolean): Promise<Response> {        
        const updateAudit = this.models.Audit
        try{                  
            const updatedId = await updateAudit.schema.methods.UpdateAudit(id, results, isDone)
            this.createActionPlan(updatedId)
            return right(Result.ok<any>(updatedId)) as Response                                
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }    
    public async getEvaluation(id: string): Promise<Response>{
        try{                         
            const audit = await this.models.Audit.findById(id)            
            .populate('schedule')
            .populate('auditor')  
            .populate('verify')       
            .populate('operator')          
            .populate({path: 'client', 
                populate:{ path: 'typeCompany', select: '-_id riskLevel', 
                    populate:{path: 'riskLevel', select: '-_id risk code'}}})
            .populate('branchOffice')                        
            .populate('impact', 'impact level')
            .exec()         
            if(audit){                   
                const impacts = await this.models.ReputationalImpact.find({},{'desc':1,'impact':'1'})
                const selectedImpact = impacts.map((i: any) =>{
                    return {
                        title: i.desc,
                        value: i.impact,
                        selected: i.impact === audit.impact.impact
                    }
                })                                    
                let result = this.map.toViewResultAudit(audit, selectedImpact)
                return right(Result.ok<any>(result)) as Response            
            } else {
                return left(new GenericAppError.NotFoundError()) as Response                
            }            
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async getEvaluationBySchedule(id: string): Promise<Response>{
        try{                                
            const audit = await this.models.Audit.findOne({schedule: id})
            .populate('schedule')
            .populate('auditor')     
            .populate('verify')       
            .populate('operator')
            .populate({path: 'client', 
                populate:{ path: 'typeCompany', select: '-_id riskLevel', 
                    populate:{path: 'riskLevel', select: '-_id risk code'}}})
            .populate('branchOffice')                        
            .populate('impact', 'impact level')
            .exec()         
            if(audit){                   
                const impacts = await this.models.ReputationalImpact.find({},{'desc':1,'impact':'1'})
                const selectedImpact = impacts.map((i: any) =>{
                    return {
                        title: i.desc,
                        value: i.impact,
                        selected: i.impact === audit.impact.impact
                    }
                })                                    
                let result = this.map.toViewResultAudit(audit, selectedImpact)
                return right(Result.ok<any>(result)) as Response            
            } else {
                return left(new GenericAppError.NotFoundError()) as Response                
            }            
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async getPlanAction(id: string): Promise<Response>{
        try{                         
            const audit = await this.models.PlanAction.findOne({'audit': id})                             
            .populate({path: 'audit', populate: {path: 'client'}})
            .populate({path: 'audit', populate: {path: 'branchOffice'}})
            .populate({path: 'audit', populate: {path: 'schedule'}})
            .exec()                     
            if(audit){                                   
                let result = this.map.toViewPlanAction(audit)
                return right(Result.ok<any>(result)) as Response            
            } else {
                return left(new GenericAppError.NotFoundError()) as Response                
            }            
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async updatePlanAction(id: string, planAction: any): Promise<Response>{
        try{                         
            const audit = await this.models.Audit.findById(id)            
            .populate('schedule')
            .populate('auditor')            
            .populate({path: 'client', 
                populate:{ path: 'typeCompany', select: '-_id riskLevel', 
                    populate:{path: 'riskLevel', select: '-_id risk code'}}})
            .populate('branchOffice')                        
            .populate('impact', 'impact level')
            .exec()         
            if(audit){                   
                const impacts = await this.models.ReputationalImpact.find({},{'desc':1,'impact':'1'})
                const selectedImpact = impacts.map((i: any) =>{
                    return {
                        title: i.desc,
                        value: i.impact,
                        selected: i.impact === audit.impact.impact
                    }
                })                                    
                let result = this.map.toViewResultAudit(audit, selectedImpact)
                return right(Result.ok<any>(result)) as Response            
            } else {
                return left(new GenericAppError.NotFoundError()) as Response                
            }            
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }    
    public async getAllAudits(): Promise<Response> {
        try{                         
            const schedules = await this.models.Audit.find()
            .populate('schedule')            
            .populate('client')
            .populate('branchOffice')
            .populate('auditor')
            .exec()         
            if(schedules){                                
                let protocolSchedulesView: any[] = []
                schedules.forEach((element: any) => {
                    protocolSchedulesView.push(this.map.toViewAuditSchedule(element))
                })
                return right(Result.ok<any>(protocolSchedulesView)) as Response            
            } else {
                return left(new GenericAppError.NotFoundError()) as Response                
            }            
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async getAllAuditsByClient(id: string): Promise<Response> {
        try{                         
            const schedules = await this.models.Audit.find({'client': id})
            .populate('schedule')            
            .populate('client')
            .populate('branchOffice')
            .populate('auditor')
            .exec()         
            if(schedules){                                
                let protocolSchedulesView: any[] = []
                schedules.forEach((element: any) => {
                    protocolSchedulesView.push(this.map.toViewAuditSchedule(element))
                })
                return right(Result.ok<any>(protocolSchedulesView)) as Response            
            } else {
                return left(new GenericAppError.NotFoundError()) as Response                
            }            
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async getAllAuditsByProfileClient(id: string): Promise<Response> {
        try{             
            const client = await this.models.Client.findOne({'contact': id},'_id')              
            if(client){
                const schedules = await this.models.Audit.find({'client': client._id})
                .populate('schedule')            
                .populate('client')
                .populate('branchOffice')
                .populate('auditor')
                .exec()         
                if(schedules){                                
                    let protocolSchedulesView: any[] = []
                    schedules.forEach((element: any) => {
                        protocolSchedulesView.push(this.map.toViewAuditSchedule(element))
                    })
                    return right(Result.ok<any>(protocolSchedulesView)) as Response            
                } else {
                    return right(Result.ok<any>([])) as Response            
                }       
            } else {
                return right(Result.ok<any>([])) as Response            
            } 
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async saveEvidence(auditId: string, categoryId: string, itemId: string, url: string): Promise<Response> {
        const newEvidence = this.models.Evidence
        try{
            const rawEvidence = {
                audit: auditId,
                category: categoryId,
                item: itemId,
                fileName: url,
            }
            const id = await newEvidence.schema.methods.SaveEvidence(rawEvidence)
            return right(Result.ok<any>(id)) as Response            
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async getEvidence(auditId: string): Promise<Response>{
        try{                         
            const evidences = await this.models.Evidence.find({'audit': auditId}, this.removeId)
            if(evidences){                                                
                return right(Result.ok<any>(evidences)) as Response            
            } else {
                return right(Result.ok<any>([])) as Response            
            }            
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async getEvidenceByItem(auditId: string, categoryId: string, itemId: string): Promise<Response>{
        try{                         
            const evidences = await this.models.Evidence.find({'audit': auditId, 'category': categoryId, 'item': itemId}, this.removeId)
            if(evidences){                                                
                return right(Result.ok<any>(evidences)) as Response            
            } else {
                return right(Result.ok<any>([])) as Response            
            }            
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async getProjectsByOperator(operatorId: string): Promise<Response> {
        try{                         
            const query = { $or: [
                { auditor: operatorId },
                { verify: operatorId }
            ]}
            const projects = await this.models.Audit.find(query, this.removeId)
            if(projects){                                                
                return right(Result.ok<any>(projects)) as Response            
            } else {
                return right(Result.ok<any>([])) as Response            
            }            
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    //Helpers
    private async validateAvailabilityAuditor(startDate: any, endDate: any, auditor: string): Promise<boolean>{
        return true;
    }
    private async generateProtocolToAuditBySchedule(schedule: any, protocol: any, id: any){
        try{
            let protocolToAudit: any = {
                schedule: id,                
                client: schedule.client,
                branchOffice: schedule.branchOffice,
                auditor: schedule.auditor,
                verify: schedule.verify,
                operator: schedule.operator,
                protocol: {},
                auditActivities: [],
            }                    
            const activitiesClient = await this.models.Client.findById(schedule.client, 'activities').exec()              
            protocolToAudit.auditActivities = activitiesClient.activities.map((a:any) => {{return {activity: translate(a.type,'protocol'), desc: a.type}}})
            const protocolList = await this.models.Protocol.findById(schedule.protocol).populate('typesList', '-_id type').exec()
            protocol.typesList = protocolList.typesList.map((t:any)=> t.type)
            if(protocol){                                                                                   
                let protocolView =  this.map.toViewProtocolAuditSaved(protocol)
                protocolToAudit.protocol = protocolView
            }            
            return protocolToAudit
        }catch(error){
            writeLog(error, logType.error)
        }

    }
    private async createActionPlan(id: string)   {
        const audit = await this.models.Audit.findById(id)
        if(audit){            
            const planAction = this.models.PlanAction
            let result = this.map.toPersistPlanAction(audit)
            const exist = await planAction.schema.methods.Exists(id)
            if(exist){                       
                planAction.schema.methods.UpdatePlan(id, result)
            } else {                                
                planAction.schema.methods.CreatePlan(result)
            }
        }                    
    }
}