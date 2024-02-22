import * as Mongoose from "mongoose";

import { translate } from '../../localization';
import { scheduleTypes, scheduleTypeNamesArray } from '../../enums';

const scheduleProtocolClientSchema = new Mongoose.Schema({    
    client: {
        type: Mongoose.Schema.Types.ObjectId, ref: 'Client', required: true        
    },
    branchOffice: {
        type: Mongoose.Schema.Types.ObjectId, ref: 'BranchOffice', required: false        
    },
    protocol: {
        type: Mongoose.Schema.Types.ObjectId, ref: 'Protocol', required: true
    },
    auditor: {
        type: Mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true
    },
    verify: {
        type: Mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true
    },
    operator: {
        type: Mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true
    },
    scheduleStartDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    scheduleEndDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    auditStatus: { 
        type: String,
        enum: {
            values: Object.values(scheduleTypes),
            name: 'AuditStatus',
            message: translate('statusAudit','protocol', scheduleTypeNamesArray)
        },
        default: scheduleTypes.Assigned,
        required: true
    },
    creationDate: { 
        type: Date,
        default: Date.now()
    },
    lastUpdate: {
        type: Date,
        required: true,
        default: Date.now()
    }    
}, { versionKey: false });

scheduleProtocolClientSchema.methods.CreateSchedule = async function(raw: any) : Promise<any> {
    const schedule = new ScheduleProtocolClient(raw);    
    await schedule.save();      
    return schedule._id
}

scheduleProtocolClientSchema.methods.UpdateStatus = async function(id: string, newStatus: string) : Promise<any> {
    const schedule = await ScheduleProtocolClient.findById(id)
    schedule.set('auditStatus', newStatus)
    schedule.set('lastUpdate', Date.now())
    await schedule.save();      
    return schedule._id
}

const ScheduleProtocolClient = Mongoose.model('ScheduleProtocolClient', scheduleProtocolClientSchema);
export { ScheduleProtocolClient };