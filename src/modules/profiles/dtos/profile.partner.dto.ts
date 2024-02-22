import { ProfileBaseDto } from "./profile.base.dto";

export interface ProfilePartnerDto extends ProfileBaseDto {
    abstract?: string,
    parentOperator: string,
    studies: [{
        institution: string;
        level: string;
        grade: string;
        graduateYear: number;
    }],
    experience: [{
        enterprise: string;
        position: string;
        description: string;
        year: number;
    }]
}