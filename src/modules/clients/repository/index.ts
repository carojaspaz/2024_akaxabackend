import { ClientErrors } from './client.repository.errors'
import { ClientRepository } from './client.repository'
import { models } from '../../../core'

const clientRepository = new ClientRepository(models)

export {
    clientRepository,
    ClientErrors
}