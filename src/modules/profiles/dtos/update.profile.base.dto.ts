export interface UpdateProfileBaseDto {
    firstName: string
    lastName: string    
    abstract: string
    phones: [{
        number: string
        type: string
    }]   
}