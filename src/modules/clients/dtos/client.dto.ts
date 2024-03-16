export interface ClientDto {
    legalName: string
    businessName: string
    identification: {
        number: string
        type: string
    }
    contacts: {
        name: string
        position: string
        email: string
        phone: {
            type: string
            number: string
        }
    }[]
    phones: {
        number: string
        type: string
    }[]
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
    totalEmployees: number
    description: string
    email: string
    website: string
    socialNetworks: {
        user: string
        network: string
    }[]
    codeCIIU: {}
}