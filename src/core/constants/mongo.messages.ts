export class MongoMessages {
    static msj = {        
        connectionError: "Connection error"
    }
    static profileDiscriminator = {
        key: 'typeProfile',
        admin: 'Admin',
        operator: 'Operator',
        partner: 'Partner',
        client: 'Contact'
    }
    static operatorDiscriminator = {
        key: 'typeOperator',
        legal: 'Legal',
        natural: 'Natural'
    }
    static resources = {
        defaultPic: 'https://akaxabucket.s3.us-east-2.amazonaws.com/profile/default-profile.png'
    }
}