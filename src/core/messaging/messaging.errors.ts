import { Result, DomainError} from '../logic';

export namespace MessagingErrors {
    export class UnregisteredDomainCommand extends Result<DomainError> {
        /**
         *
         */
        constructor(command: string) {
            super(false,{
                message: `Command ${command} has no handlers registered`
            } as DomainError);
            
        }
    }
    export class UnregisteredDomainEvent extends Result<DomainError> {
        /**
         *
         */
        constructor(event: string) {
            super(false,{
                message: `Event ${event} has no handle`
            } as DomainError);
            
        }
    }
}