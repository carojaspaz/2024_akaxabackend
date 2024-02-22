import { UseCaseError, Result, translate } from '../../../core';

export namespace ProtocolErrors {
    export class ProtocolAlreadyExists extends Result<UseCaseError> {
        constructor (email: string) {
            super(false, {
                message: translate('protocolAlreadyExists','protocol')
            } as UseCaseError);
        }
    }                    
    export class ProtocolScheduleNotAvailable extends Result<UseCaseError> {
        constructor () {
            super(false, {
                message: 'Horario no disponible'
            } as UseCaseError);
        }
    }                    
} 