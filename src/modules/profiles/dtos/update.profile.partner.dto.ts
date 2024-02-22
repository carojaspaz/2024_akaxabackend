import { UpdateProfileBaseDto } from "./update.profile.base.dto";

export interface UpdateProfilePartnerDto extends UpdateProfileBaseDto {
    studies: [{
        institution: string;
        level: string;
        grade: string;
        graduateYear: number;
        evidence: string;
    }],
    experience: [{
        enterprise: string;
        position: string;
        description: string;
        year: number;
        evidence: string;
    }],
    address?: {
        country: string
        firstPoliticalDivision: string
        secondPoliticalDivision: string
        thirdPoliticalDivision: string
        address: string
        description: string
        latitude: number
        longitude: number
    }
}