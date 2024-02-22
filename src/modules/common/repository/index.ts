import { CommonErrors } from './common.repository.error'
import { CommonRepository } from './common.repository'
import { models } from '../../../core'

const commonRepository = new CommonRepository(models)

export {
    commonRepository,
    CommonErrors
}