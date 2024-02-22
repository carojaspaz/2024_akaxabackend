export interface BranchOfficeDto {
    branchOffice: string
    totalEmployees: number
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
        address: string
        description: string
        latitude: number
        longitude: number
    }
    email: string
    activities: {
        type: string
        isSelected: boolean
    }[]
    mainOffice: string        
}