import { BaseController } from '../../../core';
import { EditInspectionCategoryDto } from '../dtos';
import { InspectionCategoryService } from '../services/inspection.category.service';
import { InspectionCategoryErrors } from '../repository';

export class UpdateInspectionCategoryController extends BaseController{        
    /**
     *
     */
    constructor(private readonly inspectionCategoryService: InspectionCategoryService) {
        super();        
    }

    async executeImpl(): Promise<any> {                
        try{          
            const id = this.req.params.id
            const dto : EditInspectionCategoryDto = this.req.body as EditInspectionCategoryDto            
            const result = await this.inspectionCategoryService.UpdateCategory(id, dto) as any
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