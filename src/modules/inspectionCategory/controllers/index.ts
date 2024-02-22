import { CreateInspectionCategoryController } from './create.inspection.category.controller'
import { UpdateInspectionCategoryController } from './update.inspection.category.controller'
import { UpdateInspectionCategoryItemController } from './update.inspection.category.item.controller'
import { CreateInspectionCategoryItemController } from './create.inspection.category.item.controller'
import { GetAllInspectionCategoryController } from './get.all.inspection.category.controller'
import { GetByIdInspectionCategoryController } from './get.by.id.inspection.category.controller'
import { GetItemsInspectionCategoryController } from './get.items.inspection.category.controller'
import { GetAllItemsInspectionCategoryController } from './get.all.inspection.category.item.controller'
import { GetByIdItemInspectionCategoryController } from './get.item.by.id.inspection.category.controller'

import { InspectionCategoryService } from '../services/inspection.category.service'

const inspectionCategoryService = new InspectionCategoryService()

const createInspectionCategoryController = new CreateInspectionCategoryController(inspectionCategoryService)
const createInspectionCategoryItemController = new CreateInspectionCategoryItemController(inspectionCategoryService)
const getAllInspectionCategoryController = new GetAllInspectionCategoryController(inspectionCategoryService)
const getByIdInspectionCategoryController = new GetByIdInspectionCategoryController(inspectionCategoryService)
const getItemsInspectionCategoryController = new GetItemsInspectionCategoryController(inspectionCategoryService)
const getAllItemsInspectionCategoryController = new GetAllItemsInspectionCategoryController(inspectionCategoryService)
const updateInspectionCategoryController = new UpdateInspectionCategoryController(inspectionCategoryService)
const updateInspectionCategoryItemController = new UpdateInspectionCategoryItemController(inspectionCategoryService)
const getByIdItemInspectionCategoryController = new GetByIdItemInspectionCategoryController(inspectionCategoryService)


export {
    createInspectionCategoryController,
    createInspectionCategoryItemController,
    getAllInspectionCategoryController,
    getByIdInspectionCategoryController,
    getItemsInspectionCategoryController,
    getAllItemsInspectionCategoryController,
    updateInspectionCategoryController,
    updateInspectionCategoryItemController,
    getByIdItemInspectionCategoryController
}