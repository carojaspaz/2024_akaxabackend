import fs from 'fs'

import { BaseController, loadProfilePic } from '../../../core';
import { UpdateProfilePartnerDto } from '../dtos';
import { ProfileService } from '../services/profile.service';
import { ProfileErrors } from '../repository';

export class UpdateProfilePartnerController extends BaseController{        
    /**
     *
     */
    constructor(private readonly profileService: ProfileService) {
        super();        
    }

    async executeImpl(): Promise<any> {                
        try{            
            const id = this.req.params.id
            const dto : UpdateProfilePartnerDto = this.req.body as UpdateProfilePartnerDto;            
            const result = await this.profileService.UpdateProfilePartner(id, dto) as any;
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