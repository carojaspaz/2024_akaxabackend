import { translate } from '../localization'
export interface IGuardResult {
    succeeded: boolean;
    message?: string;
  }
  
  export interface IGuardArgument {
    argument: any;
    argumentName: string;
  }
  
  export type GuardArgumentCollection = IGuardArgument[];
  
  export class Guard {
    public static combine (guardResults: IGuardResult[]): IGuardResult {
      for (let result of guardResults) {
        if (result.succeeded === false) return result;
      }
  
      return { succeeded: true };
    }
  
    public static againstNullOrUndefined (argument: any, argumentName: string): IGuardResult {
      if (argument === null || argument === undefined) {
        return { succeeded: false, message: translate('nullOrUndefined','core', [argumentName]) }
      } else {
        return { succeeded: true }
      }
    }
  
    public static againstNullOrUndefinedBulk(args: GuardArgumentCollection): IGuardResult {
      for (let arg of args) {
        const result = this.againstNullOrUndefined(arg.argument, arg.argumentName);
        if (!result.succeeded) return result;
      }
  
      return { succeeded: true }
    }
  
    public static isOneOf (value: any, validValues: any[], argumentName: string) : IGuardResult {
      let isValid = false;
      for (let validValue of validValues) {
        if (value === validValue) {
          isValid = true;
        }
      }
  
      if (isValid) {
        return { succeeded: true }
      } else {
        return { 
          succeeded: false, 
          message: `${argumentName} ${translate('correctType','core')} ${JSON.stringify(validValues)}. ${translate('got','core')} "${value}".` 
        }
      }
    }
  
    public static inRange (num: number, min: number, max: number, argumentName: string) : IGuardResult {
      const isInRange = num >= min && num <= max;
      if (!isInRange) {
        return { succeeded: false, message: `${argumentName} ${translate('notInRange','core')} ${min} ${translate('to','core')} ${max}.`}
      } else {
        return { succeeded: true }
      }
    }
  
    public static allInRange (numbers: number[], min: number, max: number, argumentName: string) : IGuardResult {
      let failingResult: IGuardResult = null as any;
      for(let num of numbers) {
        const numIsInRangeResult = this.inRange(num, min, max, argumentName);
        if (!numIsInRangeResult.succeeded) failingResult = numIsInRangeResult;
      }
  
      if (failingResult) {
        return { succeeded: false, message: `${argumentName} ${translate('notBetween','core')}`}
      } else {
        return { succeeded: true }
      }
    }
  }