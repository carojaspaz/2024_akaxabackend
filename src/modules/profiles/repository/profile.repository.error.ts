import { UseCaseError, Result, translate } from '../../../core'

export namespace ProfileErrors {
    export class ProfileDoesNotExists extends Result<UseCaseError> {
        constructor () {
            super(false, {
                message: translate('profileDoesNotExist','profile')
            } as UseCaseError);
        }
    }
    export class WrongType extends Result<UseCaseError> {
        constructor () {
            super(false, {
                message: 'Tipo incorrecto'
            } as UseCaseError);
        }
    }
}