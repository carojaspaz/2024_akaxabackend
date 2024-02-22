import { BaseController } from '../../../core'
import { ProfileService } from '../services/profile.service';
import { ProfileErrors } from '../repository';
import fs from 'fs'


export class UpdatePictureProfileController extends BaseController{  
    /**
     *
     */
    constructor(private readonly profileService: ProfileService) {
        super();        
    }          

    async executeImpl(): Promise<any> {        
        try{                       
            const file = fs.createReadStream(this.req.file.path)
            const id = this.req.params.id            
            const url = await this.profileService.UploadFile(file, id, this.req.file.originalname) as any;
            fs.unlinkSync(this.req.file.path)            
            const result = await this.profileService.UpdatePicProfile(id, url) as any
            if(result.isLeft()) {
                const error = result.value;
                switch(error.constructor){                   
                    default:
                        return this.clientError(error.errorValue().message);
                }
            } else {
                return this.ok(result.value.getValue());
            } 
        } catch (error) {
            return this.fail(error);
        }        
    }
    
}