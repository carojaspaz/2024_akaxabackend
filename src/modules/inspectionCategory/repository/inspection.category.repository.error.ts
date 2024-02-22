import { UseCaseError, Result, translate } from '../../../core';

export namespace InspectionCategoryErrors {
    export class CategoryAlreadyExists extends Result<UseCaseError> {
        constructor (email: string) {
            super(false, {
                message: translate('inspectionCategoryAlreadyExists','sector')
            } as UseCaseError);
        }
    }                    
} 