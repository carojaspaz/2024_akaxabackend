export interface ProfileBaseDto {
    firstName: string
    lastName: string
    identification: {
        number: string
        type: string
    },
    phones: {
        number: string
        type: string
    }[]
    email: string
    profilePicture?: string
}