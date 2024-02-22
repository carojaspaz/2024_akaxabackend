export interface ViewNaturalOperatorDto {
    id: string
    typeOperator: string
    firstName: string    
    lastName: string
    abstract?: string
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