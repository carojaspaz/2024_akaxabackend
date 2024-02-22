export interface ProtocolUpdateDto {            
    valued: boolean
    categories: {
        id: string        
        totalCategory: number
        factor: number        
        items: {
            id: string            
            safetyValidation: {        
                id: number        
                isSelected: boolean
            }[]
            value: number                    
        }[]
    }[]
}