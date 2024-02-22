import * as jwt from "jsonwebtoken"
import moment = require('moment');

import { writeLog, logType } from '../../logger';
import { Config } from '../../config';
import { translate } from '../localization';
import { rolesNames } from '../enums';

import { PermissionRoleService } from './services/permission.role.service';

import 'dotenv/config';

const auth = async(req: any, res: any, next: any) => {    
    try{      
        let role = ''
        try{                              
            const token = req.header('Authorization').replace('Bearer ','')       
            const data : any = jwt.verify(token, Config.jwtSecret)
            const expiration = moment(new Date(data['expiration']))
            const today = moment(Date.now())                
            if(expiration.isBefore(today)){        
                res.status(401).send({ message:  translate('tokenExpire', 'user') })                
                return             
            }        
            role = data["role"]
        } catch(e){
            role = rolesNames.Anonymous
        }
        const access = await PermissionRoleService.checkPermission(role, req.route.path)
        if(!access){
            throw new Error()
        }        
        next();
    } catch(err){        
        res.status(403).send({ message: translate('notAllowedAccess', 'user') })
    }
}

export { auth };