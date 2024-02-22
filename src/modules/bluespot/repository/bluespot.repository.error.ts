import { UseCaseError, Result, translate } from '../../../core';

export namespace BlueSpotErrors {
    export class NotFound extends Result<UseCaseError> {
        constructor () {
            super(false, {
                message: translate('notFound','blueSpot')
            } as UseCaseError);
        }
    }               
} 