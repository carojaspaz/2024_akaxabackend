export interface ProtocolViewDto {    
    id: string
    name: string
    valued: boolean
    categories: {
        id: string,
        name: string,
        totalCategory: number,
        factor: number,
        items: {
            id: string,
            inspectionItem: string,
            subjectItem: string,
            safetyValidation: any,
            value: number,
            risk: string
        }[]
    }[]
}