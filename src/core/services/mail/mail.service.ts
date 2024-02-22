import { Config } from '../../../config'
import { translate } from '../../localization'

const sgMail = require('@sendgrid/mail');

export namespace MailService {    

    export const sendTestMail = (to: string) => {
        sgMail.setApiKey(Config.sendGrid)
        const msg = {
            to: to,
            from: Config.email,
            subject: 'Prueba',
            text: 'Mensaje de Prueba',
            html: '<p>Mensaje de Prueba</p>'
        }
        sgMail.send(msg, false, ((error: any, result:any)=>{
            if(error)
                return `Err: ${error}`
            if(result)
                return `Ok: ${result}`
        }))
        return `Ok: ${to}`
    }
    export const sendMail = (to: string, password: string) => {
        sgMail.setApiKey(Config.sendGrid)
        const msg = {
            to: to,
            from: Config.email,
            subject: translate('welcomeSubject','mail'),
            text: translate('welcomeText','mail', [password]),
            html: translate('welcomeHtml','mail', [password])
        }
        sgMail.send(msg, false, function(e: any, result: any) {
            if(e){                
                return translate('sendMailError', 'mail')
            } else {                
                return translate('sendMailError', 'mail')
            }
        })
    }


    export const resetPasswordSendMail = (to: string, password: string) => {
        sgMail.setApiKey(Config.sendGrid)
        const msg = {
            to: to,
            from: Config.email,
            subject: translate('resetPasswordSubject','mail'),
            text: translate('passwordReset','mail', [password]),
            html: translate('passwordResetHtml','mail', [password])
        }
        sgMail.send(msg, false, function(e: any, result: any) {
            if(e){                
                return translate('sendMailError', 'mail')
            } else {                
                return translate('sendMailSuccess', 'mail')
            }
        })
    }
}