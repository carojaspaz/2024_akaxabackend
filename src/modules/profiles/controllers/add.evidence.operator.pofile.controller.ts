import { BaseController } from '../../../core';
import { StudyProfileDto, ExperienceProfileDto } from '../dtos';
import { ProfileService } from '../services/profile.service';
import { ProfileErrors } from '../repository';

export class AddEvidenceOperatorController extends BaseController{        
    /**
     *
     */
    constructor(private readonly profileService: ProfileService) {
        super();        
    }

    async executeImpl(): Promise<any> {
        try{
            const {type, id } = this.req.params
            let result: any
            let dto: any
            if(type === 'st'){
                dto = this.req.body as StudyProfileDto;
            } else {
                dto = this.req.body as ExperienceProfileDto;
            }            
            result = await this.profileService.AddEvidenceProfile(id, type, dto) as any;
            if(result.isLeft()) {
                const error = result.value;
                switch(error.constructor){                    
                    default:
                        return this.clientError(error.errorValue());
                }
            } else {
                return this.ok(result.value.getValue());
            }
        } catch (error) {
            return this.fail(error);
        }        
    }
    
}