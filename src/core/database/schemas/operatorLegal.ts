import * as Mongoose from "mongoose";

import { translate } from '../../localization';
import { MongoMessages } from '../../constants'
import { OperatorBase } from "./operatorBase";

const OperatorLegalSchema = new Mongoose.Schema({
    legalName:{
        type: String,
        required: [true, translate('requiredField' , 'schema' , ['legalName'])],
    },
    businessName:{
        type: String,
        required: [true, translate('requiredField' , 'schema' , ['businessName'])],
    },       
}, { versionKey: false })

OperatorLegalSchema.methods.CreateOperator =async (raw: any) => {
    const op = new OperatorLegal(raw)
    return await op.save()
}

const OperatorLegal = OperatorBase.discriminator(MongoMessages.operatorDiscriminator.legal, OperatorLegalSchema)

export { OperatorLegal }