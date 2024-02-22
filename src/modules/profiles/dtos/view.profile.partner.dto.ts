import { ViewProfileDto } from "./view.profile.dto";

export interface ViewPartnerProfileDto extends ViewProfileDto {
    approved: boolean
    operator: string
    studies: {
        id: string
        institution: string
        level: string
        grade: string
        graduateYear: number
        evidence: string
    }[],
    experience: {
        id: string
        enterprise: string
        position: string
        description: string
        year: number
        evidence: string
    }[],  
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
}