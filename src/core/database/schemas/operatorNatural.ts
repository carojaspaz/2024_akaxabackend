import * as Mongoose from "mongoose";

import { translate } from '../../localization';
import { MongoMessages } from '../../constants'
import { OperatorBase } from "./operatorBase";

const OperatorNaturalSchema = new Mongoose.Schema({
               
}, { versionKey: false })

OperatorNaturalSchema.methods.CreateOperator =async (raw: any) => {
    const op = new OperatorNatural(raw)
    await op.save()
    return op
}

const OperatorNatural = OperatorBase.discriminator(MongoMessages.operatorDiscriminator.natural, OperatorNaturalSchema)

export { OperatorNatural }