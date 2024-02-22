import fs from 'fs'

import { BaseController, loadProfilePic } from '../../../core';
import { UpdateProfileOperatorDto } from '../dtos';
import { ProfileService } from '../services/profile.service';
import { ProfileErrors } from '../repository';

export class UpdateProfileOperatorController extends BaseController{        
    /**
     *
     */
    constructor(private readonly profileService: ProfileService) {
        super();        
    }

    async executeImpl(): Promise<any> {                
        try{            
            const id = this.req.params.id
            const dto : UpdateProfileOperatorDto = this.req.body as UpdateProfileOperatorDto;            
            const result = await this.profileService.UpdateProfileOperator(id, dto) as any;
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