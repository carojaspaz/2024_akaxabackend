export interface ProtocolDto {
    name: string
    typesList: string[]
    ciiu: {
        sector: string
        division: string
        subdivision: string
        activity: string
    }
    categories: {
        id: string
        items: any[]
        noItems: boolean
    }[]
}