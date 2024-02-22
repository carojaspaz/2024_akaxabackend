import * as mongoose from 'mongoose' 

import { translate } from '../../localization';

const CIIUType = new mongoose.Schema({
    sector: {type: String},
    division: {type: String},
    subdivision: {type: String},
    activity: {type: String}
},{ _id: false})


export { CIIUType }