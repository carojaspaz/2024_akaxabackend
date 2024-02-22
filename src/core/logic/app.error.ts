
import { Result } from './result'
import { DomainError } from './domain.error'
import { translate } from '../localization'

export namespace GenericAppError {
  export class UnexpectedError extends Result<DomainError> {
    public constructor (err: any) {
      super(false, err.message);      
    }

    public static create (err: any): UnexpectedError {
      return new UnexpectedError(err)
    }
  }

  export class NotFoundError extends Result<DomainError> {
    public constructor () {
      super(false, translate('notFound', 'schema'))
    }

    public static create (): NotFoundError {
      return new NotFoundError()
    }
  }
}