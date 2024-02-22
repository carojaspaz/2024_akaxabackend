import { BaseController } from '../../../core'
import { OpertorService } from '../services/operator.service';
import { OperatorErrors } from '../repository';
import fs from 'fs'


export class UpdatePictureProfileController extends BaseController{  
    /**
     *
     */
    constructor(private readonly operatorService: OpertorService) {
        super();        
    }          

    async executeImpl(): Promise<any> {        
        try{                       
            const file = fs.createReadStream(this.req.file.path)
            const id = this.req.params.id            
            const url = await this.operatorService.UploadFile(file, id, this.req.file.originalname) as any;
            fs.unlinkSync(this.req.file.path)            
            const result = await this.operatorService.UpdatePicOperator(id, url) as any
            if(result.isLeft()) {
                const error = result.value;
                switch(error.constructor){  
                    case OperatorErrors.OperatorDoesNotExists:
                        return this.notFound(error.errorValue().message)                 
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