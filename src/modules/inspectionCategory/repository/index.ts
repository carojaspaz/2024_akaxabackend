import { InspectionCategoryErrors } from './inspection.category.repository.error'
import { InspectionCategoryRepository } from './inspection.category.repository'
import { models } from '../../../core'

const inspectionCategoryRepository = new InspectionCategoryRepository(models)

export {
    inspectionCategoryRepository,
    InspectionCategoryErrors
}