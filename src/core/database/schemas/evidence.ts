import * as Mongoose from "mongoose";

const evidenceSchema = new Mongoose.Schema({    
    audit: {type: Mongoose.Schema.Types.ObjectId, ref: 'Audit', required: true},
    category: {type: String, required: true},
    item: {type: String, required: true},
    fileName: {type: String, required: true},
    date: {type: Date, default: Date.now()},    
}, { versionKey: false });

evidenceSchema.methods.SaveEvidence = async function(raw: any) : Promise<any> {
    const evidence = new Evidence(raw);    
    await evidence.save();      
    return evidence._id
}

const Evidence = Mongoose.model('Evidence', evidenceSchema);
export { Evidence };