import * as express from 'express';
import { auth } from '../../../core'
import {
    createInspectionCategoryController,
    updateInspectionCategoryController,
    createInspectionCategoryItemController,
    getAllInspectionCategoryController,
    getByIdInspectionCategoryController,
    getItemsInspectionCategoryController,
    getAllItemsInspectionCategoryController,
    updateInspectionCategoryItemController,
    getByIdItemInspectionCategoryController
} from '../controllers'

const inspectionCategoryRouter = express.Router()

inspectionCategoryRouter.post('/inspectionCategory/', auth,
    (req, res) => createInspectionCategoryController.execute(req, res))

inspectionCategoryRouter.post('/inspectionCategory/item/', auth,
    (req, res) => createInspectionCategoryItemController.execute(req, res))

inspectionCategoryRouter.post('/inspectionCategory/getAll/', auth,
    (req, res) => getAllInspectionCategoryController.execute(req, res))

inspectionCategoryRouter.get('/inspectionCategory/:id', auth,
    (req, res) => getByIdInspectionCategoryController.execute(req, res))

inspectionCategoryRouter.get('/inspectionCategory/item/:id', auth,
    (req, res) => getByIdItemInspectionCategoryController.execute(req, res))

inspectionCategoryRouter.get('/inspectionCategory/getAll/items/', auth,
    (req, res) => getAllItemsInspectionCategoryController.execute(req, res))

inspectionCategoryRouter.get('/inspectionCategory/items/:id', auth,
    (req, res) => getItemsInspectionCategoryController.execute(req, res))

inspectionCategoryRouter.patch('/inspectionCategory/edit/:id', auth,
    (req, res) => updateInspectionCategoryController.execute(req, res))

inspectionCategoryRouter.patch('/inspectionCategory/item/edit/:id', auth,
    (req, res) => updateInspectionCategoryItemController.execute(req, res))

export { inspectionCategoryRouter }