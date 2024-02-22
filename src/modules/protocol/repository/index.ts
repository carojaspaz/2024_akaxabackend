import { ProtocolErrors } from './protocol.repository.errors'
import { ProtocolRepository } from './protocol.repository'
import { models } from '../../../core'

const protocolRepository = new ProtocolRepository(models)

export {
    protocolRepository,
    ProtocolErrors
}