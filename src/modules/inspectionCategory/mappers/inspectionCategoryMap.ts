import { translate } from '../../../core'
import { InspectionCategoryDto, InspectionCategoryItemDto, ViewInspectionCategoryDto, ViewInspectionCategoryItemDto } from '../dtos'
import { CommonService  } from '../../common/services/common.service'

export class InspectionCategoryMap {
    toPersistence = (t: InspectionCategoryDto): any => {
        const category = {
            sector: t.codeCIIU.sector,
            division: t.codeCIIU.division,
            subdivision: t.codeCIIU.subdivision? t.codeCIIU.subdivision : 'All',
            activity: t.codeCIIU.activity? t.codeCIIU.activity : 'All',
            subject: t.subject,
            evaluationType: t.evaluationType,
            description: t.description,            
        }
        return category
    }

    toPersistenceItem = (t: InspectionCategoryItemDto): any => {                
        const categoryItem = {
            inspectionCategory: t.idInspectionCategory,
            item: t.item,
            subject: t.subject,     
            value: t.value,       
            conditionRisk: t.idConditionRisk,            
        }        
        return categoryItem
    }

    toViewCategoryItem = (t: any): ViewInspectionCategoryItemDto => {        
        const categoryItem: ViewInspectionCategoryItemDto = {
            id: t._id,
            inspectorCategory: t.inspectionCategory.subject,
            item: t.item,
            subject: t.subject,            
            value: t.value,            
            conditionRisk: t.conditionRisk.risk,
            conditionRiskCode: t.conditionRisk.desc,     
        }
        return categoryItem
    }

    toViewCategory = (t: any): ViewInspectionCategoryDto => {
        const commonService = new CommonService()        
        const sectorName = t.sector
        const divisionName = t.division
        const subdivisionName = t.subdivision !== 'All' ? commonService.GetSubDivisionName(t.sector, t.division, t.subdivision).value.getValue() : translate('All SubDivision', 'sector')
        const activityName = t.activity !== 'All' ? commonService.GetActivityName(t.sector, t.division, t.subdivision, t.activity).value.getValue() : translate('All Activities', 'sector')
        const category: ViewInspectionCategoryDto = {
            id: t._id,
            sector: sectorName,
            division: divisionName,
            subdivision: t.subdivision,
            subdivisionName: subdivisionName,
            activity: t.activity,
            activityName: activityName,
            subject: t.subject,
            evaluationType: t.evaluationType,
            description: t.description,            
            activitiesVerify: t.activitiesVerify
        }
        return category
    }
}