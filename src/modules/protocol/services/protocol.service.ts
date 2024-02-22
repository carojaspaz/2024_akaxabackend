import { loadEvidenceItemInspection } from '../../../core'
import { protocolRepository } from '../repository'
import { ProtocolDto, CIUUFilterDto, ProtocolClientDto, ProtocolUpdateDto } from '../dtos'

export class ProtocolService {
    async CreateProtocol(protocol: ProtocolDto): Promise<any>{
        return await protocolRepository.save(protocol)
    }

    async GetAllNameId(): Promise<any>{
        return await protocolRepository.getAllNameIdProtocols()
    }

    async GetAllReputationalImpact(): Promise<any>{
        return await protocolRepository.getReputationalImpactOptions()
    }

    async GetAllNameIdByCuii(filter?: CIUUFilterDto): Promise<any>{
        return await protocolRepository.getAllNamedIdProtocolsByCuii(filter)
    }

    async GetAllById(id: string): Promise<any>{
        return await protocolRepository.getAllById(id)
    }

    async GetProtocol(filter: CIUUFilterDto): Promise<any>{
        return await protocolRepository.getProtocolsFilter(filter)
    }

    async SaveScheduleProtocol(protocolClient: ProtocolClientDto): Promise<any>{
        return await protocolRepository.saveScheduleProtocolClient(protocolClient)
    }

    async GetAllScheduleProtocols(): Promise<any>{
        return await protocolRepository.getAllSchedules()
    }

    async GetAllScheduleProtocolsByClient(id: string): Promise<any>{
        return await protocolRepository.getAllSchedulesByClient(id)
    }

    async GetAllScheduleProtocolsByAuditor(id: string): Promise<any>{
        return await protocolRepository.getAllSchedulesByAuditor(id)
    }
    async GetAllScheduleProtocolsByVerify(id: string): Promise<any>{
        return await protocolRepository.getAllSchedulesByVerify(id)
    }

    async GetAllScheduleProtocolsByOperator(id: string): Promise<any>{
        return await protocolRepository.getAllSchedulesByOperator(id)
    }

    async GetScheduleById(id: string): Promise<any>{
        return await protocolRepository.getScheduleById(id)
    }

    async UpdateScheduleStatus(id: string, newStatus: string): Promise<any>{
        return await protocolRepository.updateScheduleStatus(id, newStatus)
    }

    async UpdateProtocol(id: string, protocol: ProtocolUpdateDto): Promise<any>{
        return await protocolRepository.updateProcotol(id, protocol)
    }

    async GeneratePrototolToAudit(id: string): Promise<any>{
        return await protocolRepository.generateProtocolToAudit(id)
    }

    async UpdateAudit(id: string, results: any, isDone: boolean): Promise<any>{
        return await protocolRepository.updateAudit(id, results, isDone)
    }
    async GetEvaluation(id: string): Promise<any>{
        return await protocolRepository.getEvaluation(id)
    }
    async GetEvaluationBySchedule(id: string): Promise<any>{
        return await protocolRepository.getEvaluationBySchedule(id)
    }
    async GetPlanAction(id: string): Promise<any>{
        return await protocolRepository.getPlanAction(id)
    }
    async UpdatePlanAction(id: string, planAction: any): Promise<any>{
        return await protocolRepository.updatePlanAction(id,planAction)
    }
    async GetAllAudits():Promise<any>{
        return await protocolRepository.getAllAudits()
    }
    async GetAllAuditsByClient(id: string):Promise<any>{
        return await protocolRepository.getAllAuditsByClient(id)
    }
    async GetAllAuditsByProfileClient(id: string):Promise<any>{
        return await protocolRepository.getAllAuditsByProfileClient(id)
    }
    async UploadEvidence(auditId:any, file: any, name: any): Promise<any> {
        return await loadEvidenceItemInspection(auditId, file, name)
    }
    async SaveEvidence(auditId: string, categoryId: string, itemId: string, url: string): Promise<any> {
        return await protocolRepository.saveEvidence(auditId, categoryId, itemId, url)
    }
    async GetEvidenceByAudit(auditId: string): Promise<any>{
        return await protocolRepository.getEvidence(auditId)
    }
    async GetEvidenceByItemAudit(auditId: string, categoryId: string, itemId: string): Promise<any>{
        return await protocolRepository.getEvidenceByItem(auditId, categoryId, itemId)
    }
}