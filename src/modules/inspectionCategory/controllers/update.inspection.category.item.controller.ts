import { BaseController } from '../../../core';
import { EditInspectionCategoryItemDto } from '../dtos';
import { InspectionCategoryService } from '../services/inspection.category.service';
import { InspectionCategoryErrors } from '../repository';

export class UpdateInspectionCategoryItemController extends BaseController{        
    /**
     *
     */
    constructor(private readonly inspectionCategoryService: InspectionCategoryService) {
        super();        
    }

    async executeImpl(): Promise<any> {                
        try{          
            const id = this.req.params.id
            const dto : EditInspectionCategoryItemDto = this.req.body as EditInspectionCategoryItemDto            
            const result = await this.inspectionCategoryService.UdateCategoryItem(id, dto) as any
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