import { MongoMessages } from '../../../core'
import { ViewOperatorDto, ViewNaturalOperatorDto, ViewLegalOperatorDto } from '../dtos'
import { ProfileOperatorDto } from '../../profiles/dtos'


export class OperatorMap {
    toViewOperatorDto = (t:any): any => {
        let typeOperator = 'Persona Natural'
        let isLegal = false
        let name = ''         
        if(t.typeOperator === MongoMessages.operatorDiscriminator.legal){
            typeOperator = "Persona Jurídica"
            isLegal = true
            name = `${t.legalName} - ${t.businessName}`            
        } else {
            name = `${t.firstName} ${t.lastName}`
        }        
        const viewOperatorDto: ViewOperatorDto = {
            id: t._id,
            isLegal: isLegal,
            typeOperator: typeOperator,
            name: name,            
            identification: {
                number: t.identification.number,
                type: t.identification.type
            },
            phones: [],
            email: t.email,
            profilePicture: t.profilePicture,
            isActive: t.isActive,
            approved: t.approved,
            profileType: {
                audit: t.profileType.audit,
                consultancy: t.profileType.consultancy,
                teaching: t.profileType.teaching
            },
        }
        t.phones.forEach((element: any) =>{
            viewOperatorDto.phones.push({ number: element.number, type: element.type })
        })
        return viewOperatorDto
    }
    toViewLegalOperatorDto = (t:any): any => {
        const viewLegalOperatorDto: ViewLegalOperatorDto = {
            id: t._id,
            typeOperator: MongoMessages.operatorDiscriminator.legal,
            firstName: t.firstName,
            lastName: t.lastName,
            legalName: t.legalName,
            businessName: t.businessName,
            contact: t.contact,
            abstract: t.abstract,
            identification: {
                number: t.identification.number,
                type: t.identification.type
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
            phones: [],
            email: t.email,
            profilePicture: t.profilePicture,
            isActive: t.isActive,
            approved: t.approved,
            profileType: {
                audit: t.profileType.audit,
                consultancy: t.profileType.consultancy,
                teaching: t.profileType.teaching
            },
        }
        t.phones.forEach((element: any) =>{
            viewLegalOperatorDto.phones.push({ number: element.number, type: element.type })
        })
        return viewLegalOperatorDto
    }
    toViewNaturalOperatorDto = (t:any): any => {
        const viewNaturalOperatorDto: ViewNaturalOperatorDto = {
            id: t._id,
            typeOperator: MongoMessages.operatorDiscriminator.natural,
            firstName: t.firstName,
            lastName: t.lastName,
            abstract: t.abstract,
            identification: {
                number: t.identification.number,
                type: t.identification.type
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
            phones: [],
            email: t.email,
            profilePicture: t.profilePicture,
            isActive: t.isActive,
            approved: t.approved,
            profileType: {
                audit: t.profileType.audit,
                consultancy: t.profileType.consultancy,
                teaching: t.profileType.teaching
            },
        }
        t.phones.forEach((element: any) =>{
            viewNaturalOperatorDto.phones.push({ number: element.number, type: element.type })
        })
        return viewNaturalOperatorDto
    }
    toProfileBaseDto = (t:any): any => {       
        const profileBase: ProfileOperatorDto = {
            firstName: t.firstName,
            lastName: t.lastName,
            identification: {
                number: t.identification.number,
                type: t.identification.type
            },
            phones: [],
            email: t.email,
            studies: [],
            experience: [],
            profileType: [
                { audit: false },
                { consultancy: false },
                { teaching: false },
            ]

        }
        t.phones.forEach((element: any) =>{
            profileBase.phones.push({ number: element.number, type: element.type })
        })
        return profileBase;
    }    
}