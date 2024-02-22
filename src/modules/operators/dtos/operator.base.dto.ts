export interface OperatorBaseDto {
    email: string
    identification: {
        number: string
        type: string
    }
    abstract?: string
    address: {
        country: string
        firstPoliticalDivision: string
        secondPoliticalDivision: string
        thirdPoliticalDivision: string
        address: string
        description: string
        latitude: number
        longitude: number
    }
    phones: {
        number: string
        type: string
    }[]
    profileType: [
        { audit: boolean; },
        { consultancy: boolean; },
        { teaching: boolean; }
    ]
    profilePicture?: string
}