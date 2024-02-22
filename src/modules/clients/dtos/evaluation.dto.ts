export interface EvaluationDto {
    id: string
    isDone: boolean
    auditor: {
        name: string
        email: string
        phones: string[]
        picture: string
    }
}