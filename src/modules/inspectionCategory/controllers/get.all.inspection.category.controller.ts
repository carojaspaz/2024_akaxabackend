import { BaseController, GenericAppError } from '../../../core';
import { InspectionCategoryService } from '../services/inspection.category.service';
import { InspectionCategoryErrors } from '../repository';
import { FilterDto } from '../dtos'
export class GetAllInspectionCategoryController extends BaseController{        
    /**
     *
     */
    constructor(private readonly inspectionCategoryService: InspectionCategoryService) {
        super();        
    }

    async executeImpl(): Promise<any> {                
        try{                   
            const dto : FilterDto = this.req.body as FilterDto           
            const result = await this.inspectionCategoryService.GetAllCategories(dto) as any
            if(result.isLeft()) {
                const error = result.value;
                switch(error.constructor){   
                    case InspectionCategoryErrors.CategoryAlreadyExists:
                        return this.notFound(error.errorValue())
                    case GenericAppError.NotFoundError:
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