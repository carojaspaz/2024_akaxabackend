import { BaseController } from '../../../core';
import { InspectionCategoryDto } from '../dtos';
import { InspectionCategoryService } from '../services/inspection.category.service';
import { InspectionCategoryErrors } from '../repository';

export class CreateInspectionCategoryController extends BaseController{        
    /**
     *
     */
    constructor(private readonly inspectionCategoryService: InspectionCategoryService) {
        super();        
    }

    async executeImpl(): Promise<any> {                
        try{            
            const dto : InspectionCategoryDto = this.req.body as InspectionCategoryDto            
            const result = await this.inspectionCategoryService.CreateCategory(dto) as any
            if(result.isLeft()) {
                const error = result.value;
                switch(error.constructor){   
                    case InspectionCategoryErrors.CategoryAlreadyExists:
                        return this.notFound(error.errorValue())                                  
                    default:
                        return this.clientError(error.errorValue())
                }
            } else {
                return this.ok(result.value.getValue());
            }
        } catch (error) {
            return this.fail(error);
        }        
    }
    
}