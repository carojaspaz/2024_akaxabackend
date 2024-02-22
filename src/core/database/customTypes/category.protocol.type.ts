import * as mongoose from 'mongoose' 

import { categoryProtocolItemType } from './category.protocol.item.type'

const categoryProtocolType = new mongoose.Schema({
    idCategory:{ type: mongoose.Schema.Types.ObjectId, ref: 'InspectionCategory', required: true },
    totalCategory: Number,
    factor: Number,
    items: [categoryProtocolItemType],
    noItems: { type: Boolean, default: false }
},{ _id: false})

export { categoryProtocolType }