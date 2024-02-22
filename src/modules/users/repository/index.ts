import { UserErrors } from './user.repository.error'
import { UserRepository } from './user.repository'
import { models } from '../../../core'


const userRepository = new UserRepository(models)

export {
    userRepository,
    UserErrors
}