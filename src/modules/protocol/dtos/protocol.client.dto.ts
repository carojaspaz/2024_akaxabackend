import { NumberOfThings } from "aws-sdk/clients/iot";

export interface ProtocolClientDto {
    client: string
    branch?: string
    protocol: {
        id: string
        name: string
        categories: {
            id: string
            items: {
                id: string
                inspectionItem: string
                subjectItem: string
                descRisk: string
                risk: string
                evaluationType: string
                factor: number
                totalCategory: number
                safetyValidation: {
                    id: number
                    type: string
                    isSelected: boolean
                    value: number                    
                }[]
                activities:{
                    type: string
                    desc: string
                    isSelected: boolean
                }[]
            }[]
        }[]
    }
    schedule: {
        operator: string
        auditor: string
        verify: string
        scheduleStartDate: Date
        scheduleEndDate: Date
        auditStatus: string
    }    
}