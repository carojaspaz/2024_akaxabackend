import { BaseController } from '../../../core'

export class HealtyCheckController extends BaseController{  
    /**
     *
     */
    constructor() {
        super();        
    }          

        executeImpl(): Promise<any> {        
        try{            
            return this.ok({"status": "Ok Its working fine!!!"});
        } catch (error) {
            return this.fail(error);
        }        
    }
    
}