import { ProfileBaseDto } from "./profile.base.dto";

export interface ProfileOperatorDto extends ProfileBaseDto {
    studies: {
        institution: string;
        level: string;
        grade: string;
        graduateYear: number;
    }[],
    experience: {
        enterprise: string;
        position: string;
        description: string;
        year: number;
    }[],
    profileType: [
        { audit: boolean; },
        { consultancy: boolean; },
        { teaching: boolean; },
    ]
}