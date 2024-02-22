export interface ViewProfileDto {
    id: string
    firstName: string
    lastName: string
    fullName: string
    abstract?: string
    identification: {
        number: string
        type: string
    }
    phones: {
        number: string
        type: string
    }[]
    email: string
    profilePicture: string
    isActive: boolean
    typeProfile: string
}