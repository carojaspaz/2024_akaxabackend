import { BaseController } from '../../../core';
import { DeleteEvidenceDto } from '../dtos';
import { ProfileService } from '../services/profile.service';
import { ProfileErrors } from '../repository';

export class DeleteEvidenceOperatorController extends BaseController{        
    /**
     *
     */
    constructor(private readonly profileService: ProfileService) {
        super();        
    }

    async executeImpl(): Promise<any> {
        try{                        
            const dto: DeleteEvidenceDto = this.req.body as DeleteEvidenceDto;
            const uri = dto.url.split('/')
            if(dto.type === 'st'){
                await this.profileService.DeleteStudyEvidence(dto.idPerfil, uri[6])                
            } else if(dto.type === 'xp') {
                await this.profileService.DeleteExperienceEvidence(dto.idPerfil, uri[6])
            }
            const result = await this.profileService.RemoveEvidenceProfile(dto.type, dto.idPerfil, dto.idEvidence) as any
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