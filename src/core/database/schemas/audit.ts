import * as Mongoose from "mongoose";
import { translate } from '../../localization';
import { categoryAuditType, activityAuditType, personAuditType } from '../customTypes'

const auditSchema = new Mongoose.Schema({    
    schedule: {type: Mongoose.Schema.Types.ObjectId, ref: 'ScheduleProtocolClient', required: true},
    client: {type: Mongoose.Schema.Types.ObjectId, ref: 'Client', required: true},
    branchOffice: {type: Mongoose.Schema.Types.ObjectId, ref: 'BranchOffice', required: false},    
    auditor: {type: Mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true},
    verify: {type: Mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true},
    operator: {type: Mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true},
    auditActivities: [activityAuditType],
    participants: [personAuditType],
    abstractClient: { type: String, default: '', required: false},
    protocol: {
        id: {type: Mongoose.Schema.Types.ObjectId, ref: 'Protocol', required: true},
        name: String,   
        sourceRisk: { type: String, default: '', required: false },
        categories: [ categoryAuditType ],
        typesList: [{type: String, required: false}],
    },
    impact: {type: Mongoose.Schema.Types.ObjectId, ref: 'ReputationalImpact', required: false},
    isDone: { type: Boolean, default: false, required: false},
    startDate: {
        type: Date,
        default: null,
    },
    doneDate: {
        type: Date,
        default: null,
    },
    lastUpdate: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

auditSchema.methods.CreateAudit = async function(raw: any) : Promise<any> {
    const audit = new Audit(raw);    
    await audit.save();      
    return audit._id
}

auditSchema.methods.UpdateAudit = async function(id: String, raw: any, done: Boolean) : Promise<any>{
    const filter = { '_id': id }
    raw.lastUpdate = Date.now()
    if(done){
        let audit:any = await Audit.findById(id)
        //TODO: Actualizar si no se ha terminado
        const isDone = false //audit.isDone
        if(isDone){
            return new Error('Auditoria finalizada no se puede modificar')
        } else {
            raw.doneDate = Date.now()
            raw.isDone = true
            let auditFinish = await Audit.findOneAndUpdate(filter, raw)
            return auditFinish._id
        }
    } else {
        let audit = await Audit.findOneAndUpdate(filter, raw)
        return audit._id
    }    
} 

auditSchema.methods.StartAudit = async function(id: String) : Promise<any>{
    const filter = { '_id': id }
    Audit.findOneAndUpdate(filter,{startDate: Date.now()})
    return id
}

const Audit = Mongoose.model('Audit', auditSchema);
export { Audit };