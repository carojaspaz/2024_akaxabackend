export interface ProtocolToAuditDto {    
    id: string
    name: string
    typesList: string[]    
    categories: {
        id: string,
        name: string,
        totalCategory: number,
        totalAreasAvailables: number,
        finding: string,
        levelComplete: string,
        percent: string,
        minCategory: number,
        maxCategory: number,
        inspectionSumary: {
            label: string,
            cont: number
        }[],
        items: {
            id: string,
            inspectionItem: string,
            inspections: any,
            value: number,
            risk: string,
            finding: string,
            availabilityAreas: number,
        }[]
    }[]
}