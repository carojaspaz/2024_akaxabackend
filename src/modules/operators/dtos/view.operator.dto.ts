export interface ViewOperatorDto {
    id: string
    isLegal: boolean
    typeOperator: string
    name: string    
    identification: {
        number: string
        type: string
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