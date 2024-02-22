export interface ViewLegalOperatorDto {
    id: string
    typeOperator: string
    firstName: string    
    lastName: string
    legalName: string    
    businessName: string
    abstract?: string
    contact: any
    identification: {
        number: string
        type: string
    }
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
    phones: {
        number: string
        type: string
    }[]
    email: string
    profilePicture: string
    isActive: boolean
    approved: boolean
    profileType: {
        audit: boolean
        consultancy: boolean
        teaching: boolean
    }
}