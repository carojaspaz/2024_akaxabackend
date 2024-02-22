import * as express from 'express';
import { auth } from '../../../core'
import {
    createClientController,
    getAllClientsController,
    getClientByIdController,
    updateClientController,
    updateClientAddressController,
    updateClientSectorsController,
    toggleActiveClientController,
    createClientProfileController,
    updateClientProfileController,
    updateClientProfileAddressController,
    createBranchOfficeController,
    getAllBranchesClientController,
    getAllBranchesClientMinController,
    getBranchByIdController,
    updateBranchOfficeController,
    getAllClientsWithBranchesController,
    addOperatorToClientController,
    addOperatorToBranchController,
    getAllClientsByOperatorController,
    getAllClientsWithBranchesByOperatorController,
    getAllAuditsClientController
} from '../controllers'

const clientRouter = express.Router()

clientRouter.post('/client/', auth,
    (req, res) => createClientController.execute(req, res))

clientRouter.put('/client/:idClient', auth,
    (req, res) => updateClientController.execute(req, res))

clientRouter.post('/client/address/:idClient', auth, 
    (req, res) => updateClientAddressController.execute(req, res))

clientRouter.post('/client/sectors/:idClient', auth, 
    (req, res) => updateClientSectorsController.execute(req, res))

clientRouter.patch('/client/:idClient', auth, 
    (req, res) => toggleActiveClientController.execute(req, res))

clientRouter.patch('/client/:idClient/:idOperator', auth,
    (req, res) => addOperatorToClientController.execute(req, res))

clientRouter.patch('/client/branchOffice/:idBranch/:idOperator', auth,
    (req, res) => addOperatorToBranchController.execute(req, res))

clientRouter.get('/client/', auth,
    (req, res) => getAllClientsController.execute(req, res))

clientRouter.get('/client/byOperator/:id', auth,
    (req, res) => getAllClientsByOperatorController.execute(req, res))

clientRouter.get('/client/:idClient', auth,
    (req, res) => getClientByIdController.execute(req, res))

clientRouter.post('/client/profile/:idClient', auth, 
    (req, res) => createClientProfileController.execute(req, res))

clientRouter.put('/client/profile/:idProfile', auth, 
    (req, res) => updateClientProfileController.execute(req, res))

clientRouter.post('/client/profile/address/:idProfile', auth, 
    (req, res) => updateClientProfileAddressController.execute(req, res))

clientRouter.post('/client/branchOffice/', auth,
    (req, res) => createBranchOfficeController.execute(req, res))

clientRouter.get('/client/branchOffice/GetAll', auth,
    (req, res) => getAllClientsWithBranchesController.execute(req, res))

clientRouter.get('/client/branchOffice/byOperator/GetAll/:id', auth,
    (req, res) => getAllClientsWithBranchesByOperatorController.execute(req, res))

clientRouter.put('/client/branchOffice/:idBranchOffice', auth,
    (req, res) => updateBranchOfficeController.execute(req, res))

clientRouter.get('/client/branchOffice/byClient/:idClient', auth,
    (req, res) => getAllBranchesClientController.execute(req, res))

clientRouter.get('/client/branchOffice/byClientMin/:idClient', auth,
    (req, res) => getAllBranchesClientMinController.execute(req, res))

clientRouter.get('/client/branchOffice/byId/:idBranch', auth,
    (req, res) => getBranchByIdController.execute(req, res))

clientRouter.get('/client/audits/:idClient', auth,
    (req, res) => getAllAuditsClientController.execute(req, res))

export { clientRouter }