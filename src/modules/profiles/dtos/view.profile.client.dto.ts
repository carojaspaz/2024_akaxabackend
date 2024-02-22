import { ViewProfileDto } from "./view.profile.dto";

export interface ViewClientProfileDto extends ViewProfileDto {
    idClient: string
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