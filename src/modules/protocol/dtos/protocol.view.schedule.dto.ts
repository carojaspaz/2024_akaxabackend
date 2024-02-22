export interface ProtocolViewScheduleDto {
    id: string        
    auditStatus: string
    auditStatusLabel: String
    scheduleStartDate: string 
    scheduleEndDate: string 
    lastUpdate: string    
    clientId: string
    clientLegalName: string
    clientBusinessName: string
    clientPhones: {
        number: string
        type: string
    }[]
    clientAddress: {}    
    clientSectors: {}[]
    branchId?: string
    branchName?: string
    branchEmail?: string
    branchPhones?: {
        number: string
        type: string
    }[]
    branchAddress?: {}
    protocolId: string
    protocolName: string
    auditorId: string
    auditorFirstName: string
    auditorLastName: string
    auditorPhones: {
        number: string
        type: string
    }[]
    auditorIdentification: {}
    auditorEmail: string
    auditorPic: string
    auditorAddress: {}    
    verifyId: string
    verifyFirstName: string
    verifyLastName: string
    verifyPhones: {
        number: string
        type: string
    }[]
    verifyIdentification: {}
    verifyEmail: string
    verifyPic: string
    verifyAddress: {}    
    operatorId: string
    operatorFirstName: string
    operatorLastName: string
    operatorPhones: {
        number: string
        type: string
    }[]
    operatorIdentification: {}
    operatorEmail: string
    operatorPic: string
    operatorAddress: {}    
}