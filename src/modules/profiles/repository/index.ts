import { ProfileErrors } from './profile.repository.error'
import { ProfileRepository } from './profile.repository'
import { models } from '../../../core'

const profileRepository = new ProfileRepository(models)

export {
    profileRepository,
    ProfileErrors
}