import { OperatorErrors } from './operator.repository.errors'
import { OperatorRepository } from './operator.repository'
import { models } from '../../../core'

const operatorRepository = new OperatorRepository(models)

export {
    operatorRepository,
    OperatorErrors
}