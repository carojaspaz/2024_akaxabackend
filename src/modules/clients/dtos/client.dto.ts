export interface ClientDto {
    legalName: string
    businessName: string
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
    identification: {
        number: string
        type: string
    }
    phones: {
        number: string
        type: string
    }[]
    codeCIIU: {}
    email: string
    activities:{
        type: string,
        isSelected: boolean
    }[]    
    address: {
        country: string
        firstPoliticalDivision: string
        secondPoliticalDivision: string
        thirdPoliticalDivision: string
        address: string
        description: string
        latitude: number
        longitude: number
    }
    typeCompany: string
    idOperador?: string
}