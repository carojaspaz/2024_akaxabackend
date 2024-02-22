import * as Mongoose from "mongoose";
import { translate, Safety } from '../../../core'
import { ProtocolDto, 
    ProtocolViewDto, 
    ProtocolClientDto, 
    ProtocolViewScheduleDto, 
    ProtocolUpdateDto,
    ProtocolToAuditDto } from '../dtos'
    
import moment = require('moment')


export class ProtocolMap {
    toPersistenceSchedule = (t: ProtocolClientDto): any => {
        let scheduleProtocolClient = {
            client: t.client,
            branchOffice: t.branch,
            protocol: t.protocol.id,
            operator: t.schedule.operator,
            auditor: t.schedule.auditor,
            verify: t.schedule.verify,
            scheduleStartDate: t.schedule.scheduleStartDate,
            scheduleEndDate: t.schedule.scheduleEndDate,
            auditStatus: t.schedule.auditStatus
        }
        if(t.branch === null || t.branch === undefined || t.branch === ''){
            delete scheduleProtocolClient.branchOffice
        }
        return scheduleProtocolClient
    }
    toPersistence = (t: ProtocolDto): any => {       
        let categories: any[] = []
        t.categories.forEach((mainElement) => {            
            let items: any[] = []
            mainElement.items.forEach((element) => {
                items.push({
                    idCategoryItem: element.id,
                    safetyValidation: element.conditionRisk === 'AC'? Safety.safetyValidation : Safety.safetyValidationNoCritic,
                    value: 0
                })
            })
            categories.push({
                idCategory: mainElement.id,
                items: items,
                noItems: mainElement.noItems
            })
        })        
        const protocol = {
            name: t.name,
            typesList: t.typesList,
            CIIU: t.ciiu,
            categories: categories
        }
        return protocol
    }
    toUpdatePersistence = (t: ProtocolUpdateDto): any => {              
        let categories: any[] = []
        t.categories.forEach((element) => {
            let items: any[] = []
            element.items.forEach((itemElement) => {
                let safetyValidationItem: any[] = []
                itemElement.safetyValidation.forEach((safetyItemElement) => {
                    safetyValidationItem.push({
                        id: safetyItemElement.id,
                        type: Safety.safetyValidation.find((s) => s.id === safetyItemElement.id).type,
                        isSelected: safetyItemElement.isSelected,
                        value: Safety.safetyValidation.find((s) => s.id === safetyItemElement.id).value,
                    })
                })
                items.push({
                    idCategoryItem: itemElement.id,
                    safetyValidation: safetyValidationItem,
                    value: itemElement.value
                })                
            })
            categories.push({
                idCategory: element.id,
                totalCategory: element.totalCategory,
                factor: element.factor,
                items: items
            })
        })
        let protocol:any = {
            valued: t.valued,
            categories: categories
        }        
        return protocol
    }
    toViewNameIdProtocol = (t:any): any => {
        return {
            id: t._id,
            name: t.name
        }
    }
    toViewScheduleProtocol = (t:any): ProtocolViewScheduleDto => {
        const schedule = {
            id: t._id,
            scheduleStartDate: t.scheduleStartDate,
            scheduleEndDate: t.scheduleEndDate,            
            auditStatus: t.auditStatus,
            auditStatusLabel: translate(t.auditStatus, 'protocol'),
            lastUpdate: t.lastUpdate,
            clientId: t.client._id,
            clientLegalName: t.client.legalName,
            clientBusinessName: t.client.businessName,
            clientPhones: t.client.phones || [],
            clientAddress: t.client.address || {},
            clientSectors: t.client.sectors,
            branchId: t.branchOffice? t.branchOffice._id : '',
            branchName: t.branchOffice? t.branchOffice.branchOffice : '',
            branchEmail: t.branchOffice? t.branchOffice.email : '',
            branchPhones: t.branchOffice? t.branchOffice.phones : [],
            branchAddress: t.branchOffice? t.branchOffice.address : {},
            protocolId: t.protocol._id,
            protocolName: t.protocol.name,
            auditorId: t.auditor._id,
            auditorFirstName: t.auditor.firstName,
            auditorLastName: t.auditor.lastName,
            auditorPhones: t.auditor.phones || [],
            auditorIdentification: t.auditor.identification,
            auditorEmail: t.auditor.email,
            auditorPic: t.auditor.profilePicture,
            auditorAddress: t.auditor.address,
            verifyId: t.verify._id,
            verifyFirstName: t.verify.firstName,
            verifyLastName: t.verify.lastName,
            verifyPhones: t.verify.phones || [],
            verifyIdentification: t.verify.identification,
            verifyEmail: t.verify.email,
            verifyPic: t.verify.profilePicture,
            verifyAddress: t.verify.address,
            operatorId: t.operator._id,
            operatorFirstName: t.operator.firstName,
            operatorLastName: t.operator.lastName,
            operatorPhones: t.operator.phones || [],
            operatorIdentification: t.operator.identification,
            operatorEmail: t.operator.email,
            operatorPic: t.operator.profilePicture,
            operatorAddress: t.operator.address,
        }        
        return schedule
    }
    toViewProtocol = (t: any, conditions: any): ProtocolViewDto => {                
        let categories: any[] = []
        t.categories.forEach((element: any) => {                     
            let inspectionItems: any[] = []
            element.items.forEach((itemElement: any) => {                    
                const { risk, desc } = conditions.find((c:any) => c._id.toString() === itemElement.idCategoryItem.conditionRisk.toString())                                
                inspectionItems.push({
                    id: itemElement.idCategoryItem._id,
                    inspectionItem: itemElement.idCategoryItem.item,
                    subjectItem: itemElement.idCategoryItem.subject,
                    value: itemElement.value,
                    safetyValidation: itemElement.safetyValidation.map((s:any)=>{return { id: s.id, label: translate(s.type,'protocol'), type: s.type, isSelected: s.isSelected, value: s.value }}),
                    descRisk: desc,
                    risk: risk,
                    activities: [],
                    activitiesValues: []                    
                })
            })
            categories.push({
                id: element.idCategory._id,
                name: element.idCategory.subject,
                evaluationType: element.idCategory.evaluationType,
                totalCategory: element.totalCategory || 0,
                factor: element.factor || 0,
                items: inspectionItems
            })
        })        
        const protocol: ProtocolViewDto = {
            id: t._id,
            name: t.name,
            valued: t.valued,
            categories: categories
        }        
        return protocol
    }
    toViewProtocolAudit = (t: any): any => {
        let protocolToAudit: any = {
            id: t._id,
            startDate: t.schedule.scheduleStartDate,
            endDate: t.schedule.scheduleEndDate,
            status: t.schedule.auditStatus,
            client: {},
            branchOffice: {},
            auditor: {},
            verify: {},
            operator: {},
            protocol: t.protocol,
            participants: t.participants,
            abstractClient: t.abstractClient,
            activitiesAudit: t.auditActivities,
            impact: t.impact
            //t: t
        }  
        if(t.client){                                    
            protocolToAudit.client.name = t.client.legalName
            protocolToAudit.client.businessName = t.client.businessName
            protocolToAudit.client.totalEmployees = t.client.totalEmployees
            protocolToAudit.client.email = t.client.email
            protocolToAudit.client.address = t.client.address
            protocolToAudit.client.phones = t.client.phones    
            protocolToAudit.client.description = t.client.description        
            protocolToAudit.client.contact = t.client.contact
        }
        if(t.branchOffice){                                                     
            protocolToAudit.branchOffice.name = t.branchOffice.branchOffice
            protocolToAudit.branchOffice.totalEmployees = t.branchOffice.totalEmployees
            protocolToAudit.branchOffice.email = t.branchOffice.email
            protocolToAudit.branchOffice.address = t.branchOffice.address
            protocolToAudit.branchOffice.contact = t.branchOffice.contact
            protocolToAudit.branchOffice.phones = t.branchOffice.phones            
        }
        if(t.auditor){
            protocolToAudit.auditor.name = `${t.auditor.firstName} ${t.auditor.lastName}`
            protocolToAudit.auditor.email = t.auditor.email
            protocolToAudit.auditor.phones = t.auditor.phones
            protocolToAudit.auditor.picture = t.auditor.profilePicture
        }
        if(t.verify){
            protocolToAudit.verify.name = `${t.verify.firstName} ${t.verify.lastName}`
            protocolToAudit.verify.email = t.verify.email
            protocolToAudit.verify.phones = t.verify.phones
            protocolToAudit.verify.picture = t.verify.profilePicture
        }
        if(t.operator){
            protocolToAudit.operator.name = `${t.operator.firstName} ${t.operator.lastName}`
            protocolToAudit.operator.email = t.operator.email
            protocolToAudit.operator.phones = t.operator.phones
            protocolToAudit.operator.picture = t.operator.profilePicture
        }
        return protocolToAudit
    }
    toViewAuditSchedule(audit: any){
        const auditSchedule = {
            id: audit._id,
            schedule: audit.schedule._id,
            scheduleStartDate: audit.schedule.scheduleStartDate,
            scheduleEndDate: audit.schedule.scheduleEndDate,
            auditStatus: audit.schedule.auditStatus,
            auditStatusLabel: translate(audit.schedule.auditStatus, 'protocol'),            
            clientLegalName: audit.client.legalName,
            clientBusinessName: audit.client.businessName,
            protocolName: audit.protocol.name
        }        
        return auditSchedule
    }
    toViewProtocolAuditSaved = (t: any): ProtocolToAuditDto => {
        let categories: any[] = []
        t.categories.forEach((element: any) => {                                 
            let min = 0
            let max = 0
            let inspectionItems: any[] = [];                            
            element.items.forEach((itemElement: any) => {                        
                const options = itemElement.safetyValidation.filter((s:any)=> {return s.isSelected}).map((s:any)=>{return { 
                        type: translate(s.type,'protocol'),    
                        code: s.type,                     
                        value: s.value 
                    }
                })                                
                if(options.length > 0){                    
                    let inspections: any[] = itemElement.activities.map((a: any) => {
                        return {
                            title: a.type, desc: a.desc, options: options, value: 0
                        }
                    })                
                    if(inspections.length > 0){                                                  
                        inspectionItems.push({
                            id: itemElement.id,
                            inspectionItem: itemElement.inspectionItem,
                            subjectItem: itemElement.subjectItem,
                            value: itemElement.value,
                            inspections: inspections,
                            codeRisk: itemElement.descConditionRisk,
                            risk: translate(itemElement.descConditionRisk, 'protocol'),
                            finding: '',
                            availabilityAreas: inspections.length
                        })
                    }
                }
            })
            if(inspectionItems.length > 0){
                const minMaxOptions = inspectionItems[0].inspections[0].options.map((o:any) => o.value)    
                const offSet = minMaxOptions.includes(20)? 10 : 0
                min = Math.min.apply(Math, minMaxOptions)
                max = Math.max.apply(Math, minMaxOptions) - offSet
                const totalAreasArray = inspectionItems.map(i=>i.availabilityAreas)
                let totalAreasAvailables = totalAreasArray.reduce((a,b)=>{return a + b})
                let minCategory = min * totalAreasAvailables
                let maxCategory = max * totalAreasAvailables
                const inspectionSumary = inspectionItems[0].inspections[0].options.map((o:any) => {return { label: o.code, cont: 0 }})
                categories.push({
                    id: element.id,
                    name: element.name,
                    evaluationType: element.evaluationType,
                    factor: element.factor,
                    totalCategory: element.totalCategory,  
                    totalAreasAvailables: totalAreasAvailables,
                    finding: '',
                    items: inspectionItems,
                    levelComplete: '',
				    percent: '',
				    minCagetory: minCategory,
                    maxCategory: maxCategory,                    
                    inspectionSumary: inspectionSumary,
                    valid: false
                })
            }
        })        
        const protocol: ProtocolToAuditDto = {
            id: t.id,
            name: t.name,      
            typesList: t.typesList,
            categories: categories
        }        
        return protocol
    }
    toViewResultAudit = (t: any, impactList: any) => {
        let protocolToAudit: any = {
            id: t._id,
            startDate: t.schedule.scheduleStartDate,
            endDate: t.schedule.scheduleEndDate,            
            client: {},
            branchOffice: {},
            auditor: {},
            verify: {},
            operator: {},
            protocol: {},
            evaluation: {
                companyBase: {},
                analysis: {
                    vulnerability: {
                        value: '',
                        results: []
                    },
                    efficacy: {
                        value: '',
                        results: []
                    },
                    effectiveness : {
                        value: '',
                        results: []
                    },
                    impact: {
                        value: '',
                        results: []
                    }
                },
                result: {
                    nocCount: 0,
                    totalPercent: '',
                    riskLevel: '',
                    qualy: ''
                }
            },
            spotEvaluation: [],  
            percentBySpot:{},
            participants: t.participants,
            abstractClient: t.abstractClient,          
            activitiesToAudit: []
            //t: t
        }      
        protocolToAudit.evaluation.analysis.impact = {
            value: t.impact.impact,
            results: impactList
        }    
        if(t.client){                                    
            protocolToAudit.client.name = t.client.legalName
            protocolToAudit.client.businessName = t.client.businessName
            protocolToAudit.client.totalEmployees = t.client.totalEmployees
            protocolToAudit.client.email = t.client.email
            protocolToAudit.client.address = t.client.address
            protocolToAudit.client.phones = t.client.phones    
            protocolToAudit.evaluation.companyBase.scope = t.client.description    
            protocolToAudit.evaluation.companyBase.riskBase = t.client.typeCompany.riskLevel.risk
            protocolToAudit.evaluation.companyBase.code = t.client.typeCompany.riskLevel.code                       
            protocolToAudit.activitiesToAudit = t.client.activities.map((a:any)=>{
                return {
                    spot: a.type,
                    label: translate(a.type, 'protocol'),
                    date: moment(t.doneDate).format('YYYY/MM/DD')
                }
            })
        }
        if(t.branchOffice){                                                    
            protocolToAudit.branchOffice.name = t.branchOffice.branchOffice
            protocolToAudit.branchOffice.totalEmployees = t.branchOffice.totalEmployees
            protocolToAudit.branchOffice.email = t.branchOffice.email
            protocolToAudit.branchOffice.address = t.branchOffice.address
            protocolToAudit.branchOffice.contact = t.branchOffice.contact
            protocolToAudit.branchOffice.phones = t.branchOffice.phones            
        }
        if(t.auditor){
            protocolToAudit.auditor.name = `${t.auditor.firstName} ${t.auditor.lastName}`
            protocolToAudit.auditor.email = t.auditor.email
            protocolToAudit.auditor.phones = t.auditor.phones
            protocolToAudit.auditor.picture = t.auditor.profilePicture
        }
        if(t.verify){
            protocolToAudit.verify.name = `${t.verify.firstName} ${t.verify.lastName}`
            protocolToAudit.verify.email = t.verify.email
            protocolToAudit.verify.phones = t.verify.phones
            protocolToAudit.verify.picture = t.verify.profilePicture
        }
        if(t.operator){
            protocolToAudit.operator.name = `${t.operator.firstName} ${t.operator.lastName}`
            protocolToAudit.operator.email = t.operator.email
            protocolToAudit.operator.phones = t.operator.phones
            protocolToAudit.operator.picture = t.operator.profilePicture
        }
        if(t.protocol){             
            let totalNoc = 0                 
            protocolToAudit.protocol = t.protocol
            protocolToAudit.evaluation.companyBase.riskDesc = t.protocol.sourceRisk                                          
            const vulnerability = protocolToAudit.protocol.categories.find( (c:any) => c.evaluationType === 'vulnerability')
            let totalEfficacy = 0.0                  
            const riskLevel = Safety.riskLevel.find( r => r.code === protocolToAudit.evaluation.companyBase.code)            
            if(vulnerability){
                let value = 'MUY BAJA'
                let levelRisk
                switch (true) {
                    case vulnerability.totalCategory <= vulnerability.maxCategory*Safety.range[0]:                        
                        value = 'MUY BAJA'
                        levelRisk = riskLevel.values.find( r => r.code === 'L').value                        
                        break;
                    case vulnerability.totalCategory <= vulnerability.maxCategory*Safety.range[1]:                        
                        value = 'BAJA'
                        levelRisk = riskLevel.values.find( r => r.code === 'MD').value                        
                        break;            
                    case vulnerability.totalCategory <= vulnerability.maxCategory*Safety.range[2]:                        
                        value = 'MODERADA'
                        levelRisk = riskLevel.values.find( r => r.code === 'M').value
                        break;
                    case vulnerability.totalCategory <= vulnerability.maxCategory*Safety.range[3]:                        
                        value = 'ALTA'
                        levelRisk = riskLevel.values.find( r => r.code === 'H').value
                        break;
                    case vulnerability.totalCategory <= vulnerability.maxCategory*Safety.range[4]:                        
                        value = 'MUY ALTA'
                        levelRisk = riskLevel.values.find( r => r.code === 'VH').value
                        break;
                    default:
                        value = 'ERROR'
                        levelRisk = 0
                        break;
                }                
                protocolToAudit.evaluation.analysis.vulnerability.value = value
                const results:any[] = []
                if(vulnerability.totalAreasAvailables === vulnerability.items.length){
                    vulnerability.items.forEach((i:any) => {
                        const sv = Safety.safetyValidation.find((s:any) => s.value === i.value)
                        results.push({
                            title: i.subjectItem,
                            value: translate(sv.type,'protocol')
                        })                        
                    })                    
                } else {
                    vulnerability.items.forEach((i:any) => {                   
                        results.push({ title: i.inspectionItem, value: value})                    
                    })
                }
                totalEfficacy += levelRisk * vulnerability.factor
                protocolToAudit.evaluation.analysis.vulnerability.results = results
            }   
            const efficacy = protocolToAudit.protocol.categories.filter((c:any) => c.evaluationType === 'efficacy')
            efficacy.forEach((c:any) => {
                let value = 'MUY BAJA'
                switch (true) {
                    case c.totalCategory <= c.maxCategory*Safety.range[0]:
                        totalEfficacy += 1 * c.factor
                        value = 'MUY BAJA'
                        break;
                    case c.totalCategory <= c.maxCategory*Safety.range[1]:
                        totalEfficacy += 2 * c.factor
                        value = 'BAJA'
                        break;            
                    case c.totalCategory <= c.maxCategory*Safety.range[2]:
                        totalEfficacy += 3 * c.factor
                        value = 'MODERADA'
                        break;
                    case c.totalCategory <= c.maxCategory*Safety.range[3]:
                        totalEfficacy += 4 * c.factor
                        value = 'ALTA'
                        break;
                    case c.totalCategory <= c.maxCategory*Safety.range[4]:
                        totalEfficacy += 5 * c.factor
                        value = 'MUY ALTA'
                        break;
                    default:
                        value = 'ERROR'
                        break;
                }
                protocolToAudit.evaluation.analysis.efficacy.results.push({ title: c.finding, value: value})                
            })
            let totalEfficacyString = ''
            switch (true) {
                case totalEfficacy <= 100:
                    totalEfficacyString = 'MUY BAJA'
                    break;
                case totalEfficacy <= 200:
                    totalEfficacyString = 'BAJA'
                    break;
                case totalEfficacy <= 300:
                    totalEfficacyString = 'MODERADA'
                    break;
                case totalEfficacy <= 400:
                    totalEfficacyString = 'ALTA'
                    break;
                case totalEfficacy <= 500:
                    totalEfficacyString = 'MUY ALTA'
                    break;            
                default:
                    totalEfficacyString = 'ERROR'
                    break;
            }
            protocolToAudit.evaluation.analysis.efficacy.value = totalEfficacyString
            let totalPercent = 0.0
            protocolToAudit.protocol.categories.forEach((c:any) =>{                
                if(c.totalCategory === c.minCagetory){
                    totalPercent += c.factor
                    c.percent = "100 %"                    
                } else {
                    let percent = Number(c.totalCategory - c.maxCategory)/(c.minCagetory - c.maxCategory)
                    totalPercent += c.factor * percent
                    percent = 100 * percent
                    c.percent = percent.toFixed(2).toString().concat(' %')
                }
                protocolToAudit.evaluation.analysis.effectiveness.results.push({title: c.name, value: c.percent })
            })
            protocolToAudit.evaluation.analysis.effectiveness.value = totalPercent.toFixed(2).toString().concat(' %')
            let resume: any[] = []                  
            t.protocol.categories.forEach((c:any) => {
                if(c.evaluationType !== 'vulnerability'){                    
                    let resumeCategory: any[] = []
                    let resumeSpots = t.client.activities.map((a:any)=>{
                        return {
                            spot: a.type,
                            summary: [0,0,0,0,0]
                        }
                    })
                    resumeSpots.push({spot:'TODO', summary: [0,0,0,0,0]})                    
                    c.items.forEach((i:any) => {                    
                        i.inspections.forEach((ins:any) => {
                            if(ins.value === 20) totalNoc++
                            resumeCategory.push({                            
                                inspection: ins.desc,
                                safety: ins.value === 1? 1:0,
                                safetyGood: ins.value === 2? 1:0,
                                safetyRegular: ins.value === 5? 1:0,
                                noSafety: ins.value === 10? 1:0,
                                noCritic: ins.value === 20? 1:0,
                            })
                        })
                    })                
                    const spots = this.groupBy(resumeCategory, 'inspection')                                           
                    Object.keys(spots).forEach((s:any) => {    
                        let spot = resumeSpots.find((resumeSpot:any) => resumeSpot.spot === s)                                          
                        spot.summary = this.summaryInspection(spots[s])                        
                    });
                    resume.push({                        
                        category: c.name,                        
                        spots: resumeSpots
                })
                }
            })            
            let generalResume = this.generalSummaryInspection(resume)            
            protocolToAudit.percentBySpot = generalResume.length === 0? {labels: [], percents: [] } : this.percentSummaryInspection(generalResume)
            protocolToAudit.spotEvaluation = generalResume
            let riskLevelEvaluated = 'Extremo'
            switch (true) {
                case (totalEfficacy * t.impact.level) < 500:
                    riskLevelEvaluated = "Bajo"
                    break;
                case (totalEfficacy * t.impact.level) < 1100:
                    riskLevelEvaluated = "Medio"
                    break;            
                case (totalEfficacy * t.impact.level) < 2500:
                    riskLevelEvaluated = "Alto"
                    break;
                default:
                    riskLevelEvaluated = "Extremo"
                    break;
            }
            let qualyEvaluation = 'NO APROBADO'
            if(totalNoc <= 0 && totalPercent >= Safety.paramsQualy.minPrecent && Safety.paramsQualy.lowRisk.includes(riskLevelEvaluated)){                
                qualyEvaluation = 'APROBADO'
            } else if((totalNoc > 0 && totalPercent >= Safety.paramsQualy.minPrecent && Safety.paramsQualy.lowRisk.includes(riskLevelEvaluated)) ||
                      (totalNoc < 0 && totalPercent < Safety.paramsQualy.minPrecent && riskLevelEvaluated === 'Bajo')){
                qualyEvaluation = 'APROBADO PROVISIONAL'
            } else {
                qualyEvaluation = 'NO APROBADO'
            }

            protocolToAudit.evaluation.result = {
                nocCount: totalNoc,
                totalPercent: totalPercent.toFixed(2).toString().concat(' %'),
                riskLevel: riskLevelEvaluated,
                qualy: qualyEvaluation
            }
        }        
        return protocolToAudit        
    }    
    toViewPlanAction = (t: any) => {
        let planAction: any = {
            id: t._id,            
            client: {},
            branchOffice: {},
            schedule: {},
            protocol: t.audit.protocol.name,
            typeList: t.audit.protocol.typesList.join('-'),
            items: []            
        }   
        let items = t.items.map((i:any)=>{
            const sv = Safety.safetyValidation.find((s:any)=>s.value === i.value)            
            return {
                responsable: i.responsable,
                date: i.date,
                acepted: i.acepted,
                value: i.value,
                evaluation: translate(sv.type, 'protocol'),
                subjectItem: i.subjectItem,
                inspectionItem: i.inspectionItem,
                finding: i.finding,
                status: i.status,
                statulsLabel: translate(i.status,'protocol')

            }
        })
        planAction.items = items
        if(t.audit.client){                                             
            planAction.client.name = t.audit.client.legalName                      
        }
        if(t.audit.branchOffice){                               
            planAction.branchOffice.name = t.audit.branchOffice.branchOffice            
        }                
        if(t.audit.schedule){
            planAction.date = `${moment(t.audit.schedule.scheduleStartDate).format('YYYY/MM/DD HH:mm')} - ${moment(t.audit.schedule.scheduleEndtDate).format('YYYY/MM/DD HH:mm')}`
        }
        return planAction        
    }    
    toPersistPlanAction = (t: any) => {
        let planAction: any = {                       
            audit: t._id,
            items: []                 
        }                                
        if(t.protocol){      
            let itemsActionPlan: any[] = []
            t.protocol.categories.forEach((c:any) => {       
                c.items.forEach((i:any) => {
                   i.inspections.forEach((n:any) => {
                       if(n.value >= 5){
                           itemsActionPlan.push({
                               spot: n.title,
                               value: n.value,
                               subjectItem: i.subjectItem,
                               inspectionItem: i.inspectionItem,
                               finding: i.finding,       
                               status: 'Assigned'                        
                           })
                       }
                   });
                })         
            })            
            planAction.items = itemsActionPlan
        }        
        return planAction        
    }    
    groupBy = (xs:any, key:any) => {
        return xs.reduce((rv:any, x:any) => {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;            
        }, {})
    }
    sumOptions = (xs: any): any => {
        let sums = xs[0].map((x:any, ix: any) => {
            xs.reduce((sum:any, curr:any) =>  sum + curr[ix], 0)
        })
        return sums
    }
    summaryInspection = (xs: any): any => {
        let sums = [0,0,0,0,0]
        xs.forEach((i:any) => {
            sums[0] = sums[0] + i.safety
            sums[1] = sums[1] + i.safetyGood
            sums[2] = sums[2] + i.safetyRegular
            sums[3] = sums[3] + i.noSafety
            sums[4] = sums[4] + i.noCritic
        })
        return sums
    }
    generalSummaryInspection = (xs: any): any => {        
        let result = xs.map((s:any)=>{
            let summary:any[] = []
            let labels:any[] = []
            if(s.spots){
                labels = s.spots.map((sp:any)=>sp.spot)            
                summary.push(Array(labels.length).fill(0))
                summary.push(Array(labels.length).fill(0))
                summary.push(Array(labels.length).fill(0))
                summary.push(Array(labels.length).fill(0))
                summary.push(Array(labels.length).fill(0))                    
                s.spots.forEach((sp:any, ix:any) => {                
                    summary[0][ix] = sp.summary[0]
                    summary[1][ix] = sp.summary[1]
                    summary[2][ix] = sp.summary[2]
                    summary[3][ix] = sp.summary[3]
                    summary[4][ix] = sp.summary[4]
                })
            }
            return{
                category: s.category,
                spots: s.spots? s.spots : [],
                labels: labels,
                summary: summary
            }
        })
        return result
    }
    percentSummaryInspection = (xs: any): any => {
        const labels = xs[0].spots.map((sp:any)=>sp.spot)   
        let summaryTotal = Array(xs[0].spots.length)
        let summaryPercent = Array(xs[0].spots.length)
        let summaryTotalValued = Array(xs[0].spots.length)
        summaryTotal.fill(0)
        summaryTotalValued.fill(0)
        summaryPercent.fill(0)
        
        xs.forEach((s:any)=>{
            let sf=0, sg=0, sr=0, ns=0, nc=0
            s.labels.forEach((l:any,ix:any)=>{
                sf = s.summary[0][ix]
                sg = s.summary[1][ix]
                sr = s.summary[2][ix]
                ns = s.summary[3][ix]
                nc = s.summary[4][ix]
                let total = sf + sg + sr + ns + nc
                let totalValue = sf + (sg*2) + (sr*5) + (ns*10) + (nc*10)
                let maxTotal = total * 10
                //let percent = total===maxTotal? 0 : (totalValue - maxTotal)/(total - maxTotal) * 100                
                summaryTotal[ix] = summaryTotal[ix] + total
                summaryTotalValued[ix] = summaryTotalValued[ix] + totalValue
            })
        })
        for(let i=0;i<summaryPercent.length;i++){
            const maxTotal = 10 * summaryTotal[i]
            const percent = summaryTotal[i] === maxTotal? 0 : (summaryTotalValued[i] - maxTotal)/(summaryTotal[i]-maxTotal) * 100
            summaryPercent[i] = percent.toFixed(2)
        }
        return {labels: labels, percents: summaryPercent }
    }
}