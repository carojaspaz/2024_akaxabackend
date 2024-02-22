export interface UpdateClientDto {
    businessName: string    
    phones: {
        number: string
        type: string
    }[]
}