import { ViewClientDto, ViewBranchOfficeDto, EvaluationDto } from '../dtos'
import { CommonService } from '../../common/services/common.service'

export class ClientMap {  
    toClientDtoAdmin = (t: any): any => {
        const commonService = new CommonService()
        const response = commonService.GetActivityName(t.codeCIIU.sector, t.codeCIIU.division, t.codeCIIU.subdivision, t.codeCIIU.activity)                
        const viewClientDto: ViewClientDto = {
            id: t._id,
            idMainOffice: t._id,            
            operator: t.idOperator? `${t.idOperator.firstName} ${t.idOperator.lastName}`: 'No asignado',
            legalName: t.legalName,
            businessName: t.branchOffice,
            contacts: t.contacts,
            totalEmployees: t.totalEmployees,
            description: t.description,
            email: t.email,
            isActive: t.isActive,
            identification: {
                number: t.identification.number,
                type: t.identification.type
            }, 
            phones: [],
            address: {
                country: t.address?.country,
                firstPoliticalDivision: t.address?.firstPoliticalDivision,
                secondPoliticalDivision: t.address?.secondPoliticalDivision,
                thirdPoliticalDivision: t.address?.thirdPoliticalDivision,
                fourthPoliticalDivision: t.address?.fourthPoliticalDivision,
                zipCode: t.address?.zipCode,
                address: t.address?.address,
                description: t.address?.description,
                latitude: t.address?.latitude,
                longitude: t.address?.longitude
            },
            businessActivity: response.value.getValue(),
            codeCIIU: t.codeCIIU,            
            contact: t.contact,
            typeCompany: t.typeCompany? t.typeCompany._id : '',
            typeCompanyDescription: {
                type: t.typeCompany? t.typeCompany.type : '',
                risk: t.typeCompany? t.typeCompany.riskLevel.risk : '',
                level: t.typeCompany? t.typeCompany.riskLevel.level : '',
            },
            activities: t.activities || []
        } 
        t.phones.forEach((element: any) =>{
            viewClientDto.phones.push({ number: element.number, type: element.type })
        })        
        return viewClientDto
    }      
    toClientDto = (t: any): any => {
        const commonService = new CommonService()
        const response = commonService.GetActivityName(t.mainOffice.codeCIIU.sector, t.mainOffice.codeCIIU.division, t.mainOffice.codeCIIU.subdivision, t.mainOffice.codeCIIU.activity)                
        const viewClientDto: ViewClientDto = {
            id: t._id,
            idMainOffice: t.mainOffice._id,           
            operator: t.idOperator? `${t.idOperator.firstName} ${t.idOperator.lastName}`: 'No asignado',
            legalName: t.mainOffice.legalName,
            businessName: t.branchOffice,
            contacts: t.contacts,
            totalEmployees: t.totalEmployees,
            description: t.mainOffice.description,
            email: t.email,
            isActive: t.isActive,
            identification: {
                number: t.mainOffice.identification.number,
                type: t.mainOffice.identification.type
            }, 
            phones: [],
            address: {
                country: t.address?.country,
                firstPoliticalDivision: t.address?.firstPoliticalDivision,
                secondPoliticalDivision: t.address?.secondPoliticalDivision,
                thirdPoliticalDivision: t.address?.thirdPoliticalDivision,
                fourthPoliticalDivision: t.address?.fourthPoliticalDivision,
                zipCode: t.address?.zipCode,
                address: t.address?.address,
                description: t.address?.description,
                latitude: t.address?.latitude,
                longitude: t.address?.longitude
            },
            businessActivity: response.value.getValue(),
            codeCIIU: t.mainOffice.codeCIIU,            
            contact: t.contact,
            typeCompany: t.typeCompany? t.typeCompany._id : '',
            typeCompanyDescription: {
                type: t.typeCompany? t.typeCompany.type : '',
                risk: t.typeCompany? t.typeCompany.riskLevel.risk : '',
                level: t.typeCompany? t.typeCompany.riskLevel.level : '',
            },
            activities: t.activities || []
        } 
        t.phones.forEach((element: any) =>{
            viewClientDto.phones.push({ number: element.number, type: element.type })
        })        
        return viewClientDto
    }    
    toBranchOfficeDto = (t: any): any => {
        const commonService = new CommonService()        
        const response = commonService.GetActivityName(t.mainOffice.codeCIIU.sector, t.mainOffice.codeCIIU.division, t.mainOffice.codeCIIU.subdivision, t.mainOffice.codeCIIU.activity)        
        let operator = t.idOperator? `${t.idOperator.firstName} ${t.idOperator.lastName}`: 'No asignado'
        if(t.idOperator?.typeOperator === 'Legal'){
            operator = `${t.idOperator.legalName}`
        }
        
        const viewBranchOfficeDto: ViewBranchOfficeDto = {
            id: t._id,
            idMainOffice: t.mainOffice._id,
            legalName: t.mainOffice.legalName,
            businessName: t.mainOffice.businessName,
            branchOffice: t.branchOffice,
            operator: operator,
            totalEmployees: t.totalEmployees,
            email: t.email,
            isActive: t.isActive,            
            phones: [],
            address: {
                country: t.address?.country,
                firstPoliticalDivision: t.address?.firstPoliticalDivision,
                secondPoliticalDivision: t.address?.secondPoliticalDivision,
                thirdPoliticalDivision: t.address?.thirdPoliticalDivision,
                fourthPoliticalDivision: t.address?.fourthPoliticalDivision,
                zipCode: t.address?.zipCode,
                address: t.address?.address,
                description: t.address?.description,
                latitude: t.address?.latitude,
                longitude: t.address?.longitude
            },            
            businessActivity: response.value.getValue(),
            codeCIIU: t.mainOffice.codeCIIU,            
            contacts: t.contacts,
            activities: t.activities
        } 
        t.phones.forEach((element: any) =>{
            viewBranchOfficeDto.phones.push({ number: element.number, type: element.type })
        })        
        return viewBranchOfficeDto
    }   
    toViewBranchDto = (t: any, u: any): any => {
        const commonService = new CommonService()
        const response = commonService.GetActivityName(t.mainOffice.codeCIIU.sector, t.mainOffice.codeCIIU.division, t.mainOffice.codeCIIU.subdivision, t.mainOffice.codeCIIU.activity)                
        const activities = t.activities.map((a:any) => {                         
            const av = u.find((act:any)=> act.description === a.type)                        
            return { activity: av.activity, description: av.description}
        })
        if(activities.length > 1){
            activities.push({activity: 'Todo', description: 'TODO'})
        }
        const viewClientDto: ViewClientDto = {
            id: t._id,
            idMainOffice: t.mainOffice._id,           
            operator: t.idOperator? `${t.idOperator.firstName} ${t.idOperator.lastName}`: 'No asignado',
            legalName: t.mainOffice.legalName,
            businessName: t.branchOffice,
            contacts: t.contacts,
            totalEmployees: t.totalEmployees,
            description: t.mainOffice.description,
            email: t.email,
            isActive: t.isActive,
            identification: {
                number: t.mainOffice.identification.number,
                type: t.mainOffice.identification.type
            }, 
            phones: [],
            address: {
                country: t.address?.country,
                firstPoliticalDivision: t.address?.firstPoliticalDivision,
                secondPoliticalDivision: t.address?.secondPoliticalDivision,
                thirdPoliticalDivision: t.address?.thirdPoliticalDivision,
                fourthPoliticalDivision: t.address?.fourthPoliticalDivision,
                zipCode: t.address?.zipCode,
                address: t.address?.address,
                description: t.address?.description,
                latitude: t.address?.latitude,
                longitude: t.address?.longitude
            },
            businessActivity: response.value.getValue(),
            codeCIIU: t.mainOffice.codeCIIU,            
            contact: t.contact,
            typeCompany: t.typeCompany? t.typeCompany._id : '',
            typeCompanyDescription: {
                type: t.typeCompany? t.typeCompany.type : '',
                risk: t.typeCompany? t.typeCompany.riskLevel.risk : '',
                level: t.typeCompany? t.typeCompany.riskLevel.level : '',
            },
            activities: activities || []
        } 
        t.phones.forEach((element: any) =>{
            viewClientDto.phones.push({ number: element.number, type: element.type })
        })        
        return viewClientDto
    }    
    toViewClientWithBranches = (t:any, b:any, v: any): any => {                
        let clientsWithBranches = t.map((c:any) =>{
            const branches = b.filter((bo:any) => String(bo.mainOffice) === String(c._id))
            const viewBranches = branches.map((bo: any) =>{
                const activities = bo.activities.map((a:any) => {                         
                    const av = v.find((act:any)=> act.description === a.type)                        
                    return { activity: av.activity, description: av.description}
                })
                if(activities.length > 1){
                    activities.push({activity: 'Todo', description: 'TODO'})
                }
                return {
                    id: bo._id,
                    branchOffice: bo.branchOffice,
                    activities: activities
                }
            })            
            const activities = c.activities.map((a:any) => {                         
                const av = v.find((act:any)=> act.description === a.type)                        
                return { activity: av.activity, description: av.description}
            })
            if(activities.length > 1){
                activities.push({activity: 'Todo', description: 'TODO'})
            }
            return {
                id: c._id,
                legalName: c.legalName,
                codeCIIU: c.codeCIIU,
                activities: activities,
                branches: viewBranches
            }
        })
        return clientsWithBranches
    }
    toEvaluationDto = (t: any): any => {
        const viewAudit: EvaluationDto = {
            id: t._id,
            isDone: t.isDone,
            auditor: {
                name: `${t.auditor.firstName} ${t.auditor.lastName}`,
                email: t.auditor.email,
                phones: t.auditor.phones,
                picture: t.auditor.profilePicture
            }
        }
        return viewAudit
    }
}