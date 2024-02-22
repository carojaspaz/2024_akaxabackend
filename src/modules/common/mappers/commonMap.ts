import { translate } from '../../../core'
import { ConditionRiskDto, TypeListDto, RiskTypesDto, ViewCompanyTypeDto } from '../dtos'

export class CommonMap {    

    toViewCompanyType = (t: any): ViewCompanyTypeDto => {        
        //TODO: Implementar traducción
        const companyType: ViewCompanyTypeDto = {
            id: t._id,
            type: t.type,
            desc: t.desc,
            risk: t.riskLevel.risk,
            riskCode: t.riskLevel.code,
            riskLevel: t.riskLevel.level,
        }
        return companyType
    }
    toViewRiskType = (t: any): RiskTypesDto => {        
        //TODO: Implementar traducción
        const riskType: RiskTypesDto = {
            id: t._id,
            risk: t.risk,
            code: t.code,
            level: t.level,
        }
        return riskType
    }
    toViewCondition = (t: any): ConditionRiskDto => {        
        //TODO: Implementar traducción
        const conditionRisk: ConditionRiskDto = {
            id: t._id,
            risk: t.risk,            
        }
        return conditionRisk
    }

    toViewType = (t: any): TypeListDto => {        
        //TODO: Implementar traducción
        const typeList: TypeListDto = {
            id: t._id,
            type: t.type,            
        }
        return typeList
    }
}