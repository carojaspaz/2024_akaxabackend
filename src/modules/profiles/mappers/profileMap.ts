import { ViewProfileDto, ViewOperatorProfileDto, ViewClientProfileDto, ViewPartnerProfileDto } from '../dtos';

export class ProfileMap {
    
    toAdminDto = (t: any): any => {
        let typeProfile = 'Admin'
        if(t.typeProfile){
            typeProfile = t.typeProfile as string
        }
        const viewProfileDto: ViewProfileDto = {
            id: t._id,
            firstName: t.firstName,
            lastName: t.lastName,
            fullName: `${t.firstName} ${t.lastName}`,
            email: t.email,
            identification: {
                number: t.identification.number,
                type: t.identification.type
            },    
            phones: [],
            profilePicture: t.profilePicture,
            isActive: t.isActive,
            typeProfile: typeProfile,            
        }
        t.phones.forEach((element: any) =>{
            viewProfileDto.phones.push({ number: element.number, type: element.type })
        })
        return viewProfileDto
    }        

    toOperatorDto = (t: any, o: any): any => {
        let typeProfile = 'Admin'
        if(t.typeProfile){
            typeProfile = t.typeProfile as string
        }
        const viewProfileOperatorDto: ViewOperatorProfileDto = {
            id: t._id,
            operator: t.parentOperator? t.parentOperator : '',
            operatorId: o._id,
            approved: t.approved? t.approved : false,
            firstName: t.firstName,
            lastName: t.lastName,
            fullName: `${t.firstName} ${t.lastName}`,
            email: t.email,
            abstract: t.abstract? t.abstract : '',
            identification: {
                number: t.identification.number,
                type: t.identification.type
            },    
            phones: [],
            profilePicture: t.profilePicture,
            isActive: t.isActive,
            typeProfile: typeProfile,            
            profileType: {
                audit: t.profileType.audit,
                consultancy: t.profileType.consultancy,
                teaching: t.profileType.teaching
            },
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
            alternativeAddress: {
                country: t.secondaryAddress?.country,
                firstPoliticalDivision: t.secondaryAddress?.firstPoliticalDivision,
                secondPoliticalDivision: t.secondaryAddress?.secondPoliticalDivision,
                thirdPoliticalDivision: t.secondaryAddress?.thirdPoliticalDivision,
                fourthPoliticalDivision: t.secondaryAddress?.fourthPoliticalDivision,
                zipCode: t.secondaryAddress?.zipCode,
                address: t.secondaryAddress?.address,
                description: t.secondaryAddress?.description,
                latitude: t.secondaryAddress?.latitude,
                longitude: t.secondaryAddress?.longitude
            }
        }
        t.phones.forEach((element: any) =>{
            viewProfileOperatorDto.phones.push({ number: element.number, type: element.type })
        })        
        return viewProfileOperatorDto
    } 
    toPartnerDto = (t: any): any => {        
        const viewPartnerProfileDto: ViewPartnerProfileDto = {
            id: t._id,
            operator: t.parentOperator? t.parentOperator : '',
            approved: t.approved? t.approved : false,
            firstName: t.firstName,
            lastName: t.lastName,
            fullName: `${t.firstName} ${t.lastName}`,
            email: t.email,
            abstract: t.abstract? t.abstract : '',
            identification: {
                number: t.identification.number,
                type: t.identification.type
            },    
            phones: [],
            profilePicture: t.profilePicture,
            isActive: t.isActive,
            typeProfile: 'Partner',
            studies: [],
            experience: [],            
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
            }
        }
        t.phones.forEach((element: any) =>{
            viewPartnerProfileDto.phones.push({ number: element.number, type: element.type })
        })
        t.studies.forEach((element: any) =>{
            viewPartnerProfileDto.studies.push({ 
                id: element._id,
                institution: element.institution, 
                level: element.level,
                grade: element.grade,
                graduateYear: element.graduateYear,
                evidence: element.evidence
            })
        })
        t.experience.forEach((element: any) =>{
            viewPartnerProfileDto.experience.push({ 
                id: element._id,
                enterprise: element.enterprise,
                position: element.position,
                description: element.description,
                year: element.year,
                evidence: element.evidence
            })
        })
        return viewPartnerProfileDto
    }        
    toContactDto = (t: any, id: string): any => {
        let typeProfile = 'Admin'
        if(t.typeProfile){
            typeProfile = t.typeProfile as string
        }
        const viewProfileDto: ViewClientProfileDto = {
            id: t._id,
            firstName: t.firstName,
            lastName: t.lastName,
            fullName: `${t.firstName} ${t.lastName}`,
            email: t.email,
            identification: {
                number: t.identification.number,
                type: t.identification.type
            },    
            phones: [],
            profilePicture: t.profilePicture,
            isActive: t.isActive,
            typeProfile: typeProfile,  
            idClient: id, 
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
            alternativeAddress: {
                country: t.secondaryAddress?.country,
                firstPoliticalDivision: t.secondaryAddress?.firstPoliticalDivision,
                secondPoliticalDivision: t.secondaryAddress?.secondPoliticalDivision,
                thirdPoliticalDivision: t.secondaryAddress?.thirdPoliticalDivision,
                fourthPoliticalDivision: t.secondaryAddress?.fourthPoliticalDivision,
                zipCode: t.secondaryAddress?.zipCode,
                address: t.secondaryAddress?.address,
                description: t.secondaryAddress?.description,
                latitude: t.secondaryAddress?.latitude,
                longitude: t.secondaryAddress?.longitude
            }         
        }
        t.phones.forEach((element: any) =>{
            viewProfileDto.phones.push({ number: element.number, type: element.type })
        })
        return viewProfileDto
    }        
}