import { UseCaseError, Result, translate } from '../../../core';

export namespace UserErrors {
    export class AccountAlreadyExists extends Result<UseCaseError> {
        constructor (email: string) {
            super(false, {
                message: translate('accountAlreadyExists','user',[email])
            } as UseCaseError);
        }
    }

    export class NeedChangePassword extends Result<UseCaseError> {
      constructor (token: string) {
          super(false, {
              message: token
          } as UseCaseError);
      }
  }

    export class AccountDoesNotExists extends Result<UseCaseError> {
      constructor (email: string) {
          super(false, {
              message: translate('accountDoesNotExists','user',[email])
          } as UseCaseError);
      }    
    }
    
    export class RoleMissing extends Result<UseCaseError> {
      constructor () {
        super(false, {
          message: translate('roleMissing','user')
        } as UseCaseError);
      }
    }

    export class FacebookTokenInvalid extends Result<UseCaseError> {
        constructor () {
          super(false, {
            message: translate('facebookTokenInvalid','user')
          } as UseCaseError)
        } 
    }
    
    export class GoogleTokenInvalid extends Result<UseCaseError> {
        constructor () {
          super(false, {
            message: translate('googleTokenInvalid','user')
          } as UseCaseError)
        } 
    }

    export class AccountInactive extends Result<UseCaseError> {
      constructor (email: string) {
          super(false, {
              message: translate('inactiveAccount','user',[email])
          } as UseCaseError);
      }
    }
    export class PasswordDoesNotMatch extends Result<UseCaseError> {
      constructor () {        
          super(false, {
              message: translate('wrongPassword','user')
          } as UseCaseError);
      }
    }
} 