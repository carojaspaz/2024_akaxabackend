import { UseCaseError, Result, translate } from '../../../core'

export namespace OperatorErrors {
    export class OperatorDoesNotExists extends Result<UseCaseError> {
        constructor () {
            super(false, {
                message: translate('operatorDoesNotExist','operator')
            } as UseCaseError);
        }
    }
}