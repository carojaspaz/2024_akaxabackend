import { ViewProfileDto } from "./view.profile.dto";

export interface ViewOperatorProfileDto extends ViewProfileDto {    
    approved: boolean
    operator: string   
    operatorId: string 
    profileType: {
        audit: boolean
        consultancy: boolean
        teaching: boolean
    },
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
    },
    alternativeAddress: {
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