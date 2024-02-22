import { OperatorBaseDto } from './operator.base.dto'

export interface OperatorLegalDto extends OperatorBaseDto {
    legalName: string
    businessName: string
    contacts:{
        name: string
        position: string        
        email: string        
        phone: {
            type: string
            number: string
        }
    }[]
}