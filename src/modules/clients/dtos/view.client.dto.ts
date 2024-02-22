export interface ViewClientDto {
    id: string
    idMainOffice: string   
    legalName: string
    businessName: string
    operator?: string
    totalEmployees: number
    description: string
    contacts:{
        name: string
        position: string        
        email: string       
        phone: {
            type: string
            number: string
        }
    }[]
    email: string
    isActive: boolean
    identification: {
        number: string
        type: string
    }    
    phones: {
        number: string
        type: string
    }[]
    address: {
        country: string
        firstPoliticalDivision: string
        secondPoliticalDivision: string
        thirdPoliticalDivision: string
        fourthPoliticalDivision: string
        zipCode: string
        address: string
        description: string
        latitude: string
        longitude: string
    }
    businessActivity: string
    codeCIIU: {}    
    contact: any
    typeCompany: string
    typeCompanyDescription: {
        type: string
        risk: string
        level: string
    }
    activities: {
        code: string
        name: string
    }[]        
}