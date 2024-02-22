export interface ViewBranchOfficeDto {
    id: string
    idMainOffice: string
    legalName: string
    businessName: string
    branchOffice: string
    operator?: string
    totalEmployees: number
    email: string
    isActive: boolean
    contacts:{
        name: string
        position: string        
        email: string        
        phone: {
            type: string
            number: string
        }
    }[]
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
    activities: {
        code: string
        name: string
    }[]        
}