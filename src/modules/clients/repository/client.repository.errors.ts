import { UseCaseError, Result, translate } from '../../../core'

export namespace ClientErrors {
    export class ClientDoesNotExists extends Result<UseCaseError> {
        constructor () {
            super(false, {
                message: translate('clientDoesNotExist','client')
            } as UseCaseError);
        }
    }
}