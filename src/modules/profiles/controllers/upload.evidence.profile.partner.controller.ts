import { BaseController } from '../../../core'
import { ProfileService } from '../services/profile.service';
import { ProfileErrors } from '../repository';
import fs from 'fs'


export class UploadPartnerEvidenceController extends BaseController{  
    /**
     *
     */
    constructor(private readonly profileService: ProfileService) {
        super();        
    }

    async executeImpl(): Promise<any> {        
        try{                       
            const file = fs.createReadStream(this.req.file.path)                   
            const {type, id} = this.req.params
            let url = ''
            if(type === 'st'){
                url = await this.profileService.UploadStudyEvidence(id, file, this.req.file.originalname) as any;
            } else {
                url = await this.profileService.UploadXpEvidence(id, file, this.req.file.originalname) as any;
            }            
            return this.ok(url); 
        } catch (error) {
            return this.fail(error);
        }        
    }
    
}