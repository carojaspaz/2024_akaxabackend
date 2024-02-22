import { UseCaseError, Result, translate } from '../../../core'

export namespace CommonErrors {
    export class ParameterDoesNotExist extends Result<UseCaseError> {
        constructor (code: string) {        
            super(false, {
                message: translate('parameterNull','core', [ code ])
            } as UseCaseError);
        }
      }
}