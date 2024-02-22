import * as Mongoose from "mongoose";

import { translate } from '../../localization';

const taskListSchema = new Mongoose.Schema({    
    task:{
        type: String,
        required: [true, translate('requiredField' , 'schema' , ['activity'])],
    },
    date:{
        type: Date,
        required: true
    },        
    isActive:{
        type: Boolean,
        default: false
    },
    idUser:{
        type: Mongoose.Schema.Types.ObjectId, ref: 'User', required: false
    }
}, { versionKey: false, collection: 'taskslist' });

const TasksList = Mongoose.model('TasksList', taskListSchema)
export { TasksList }