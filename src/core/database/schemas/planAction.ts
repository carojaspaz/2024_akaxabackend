import * as Mongoose from "mongoose";
import validator from 'validator';

import { planActionItemType } from '../customTypes'

const planActionSchema = new Mongoose.Schema({    
    audit: {type: Mongoose.Schema.Types.ObjectId, ref: 'Audit', required: true},    
    items:[planActionItemType],
    doneDate: {
        type: Date,
        default: null,
    },
    lastUpdate: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

planActionSchema.methods.Exists = async function(id: string): Promise<any> {
    const filter = { 'audit': id }    
    const count = await PlanAction.countDocuments(filter)    
    return count > 0
}

planActionSchema.methods.CreatePlan = async function(raw: any): Promise<any> {
    const plan = new PlanAction(raw);    
    await plan.save()
    return plan._id
}

planActionSchema.methods.UpdatePlan = async function(id: string, raw: any): Promise<any> {    
    const filter = { 'audit': id }        
    raw.lastUpdate = Date.now()
    let plan = await PlanAction.findOneAndUpdate(filter, raw)
    return plan._id
}

planActionSchema.methods.UpdateStatus = async function(id: string, status: string): Promise<any> {
    const filter = { '_id': id }    
    let plan = await PlanAction.findOneAndUpdate(filter, { status: status, lastUpdate: Date.now()})
    return plan._id
}

const PlanAction = Mongoose.model('PlanAction', planActionSchema)
export { PlanAction }