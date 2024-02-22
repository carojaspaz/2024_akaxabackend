import { CreateClientController } from './create.client.controller'
import { GetAllClientsController } from './get.all.clients.controller'
import { GetClientByIdController } from './get.client.by.id.controller'
import { UpdateClientController } from './update.client.controller'
import { UpdateClientAddressController } from './update.client.address.controller'
import { UpdateClientSectorsController } from './update.client.sectors.controller'
import { ToggleActiveClientController } from './toggle.active.client.controller'
import { CreateClientProfileController } from './create.client.profile.controller'
import { UpdateClientProfileController } from './update.client.profile.controller'
import { UpdateClientProfileAddressController } from './update.client.profile.address.controller'
import { CreateBranchOfficeController } from './create.branch.office.controller'
import { GetAllBranchesClientController } from './get.all.branches.client.controller'
import { GetAllBranchesClientMinController } from './get.all.branches.client.min.controllert'
import { GetBranchByIdController } from './get.branch.office.by.id.controller'
import { UpdateBranchOfficeController } from './update.branch.office.controller'
import { GetAllClientsWithBranchesController } from './get.all.clients.with.branches.controller'
import { AddOperatorToClientController } from './add.operator.to.client.controller'
import { AddOperatorToBranchController } from './add.operator.to.branch.controller'
import { GetAllClientsByOperatorController } from './get.all.clients.by.operator.controller'
import { GetAllClientsWithBranchesByOperatorController } from './get.all.clients.with.branches.by.operator.controller'
import { GetAllAuditsClientController } from './get.all.audits.client.controller'

import { ClientService } from '../services/client.service'

const clientService = new ClientService()

const createClientController = new CreateClientController(clientService)
const getAllClientsController = new GetAllClientsController(clientService)
const getClientByIdController = new GetClientByIdController(clientService)
const updateClientController = new UpdateClientController(clientService)
const updateClientAddressController = new UpdateClientAddressController(clientService)
const updateClientSectorsController = new UpdateClientSectorsController(clientService)
const toggleActiveClientController = new ToggleActiveClientController(clientService)
const createClientProfileController = new CreateClientProfileController(clientService)
const updateClientProfileController = new UpdateClientProfileController(clientService)
const updateClientProfileAddressController = new UpdateClientProfileAddressController(clientService)
const createBranchOfficeController = new CreateBranchOfficeController(clientService)
const getAllBranchesClientController = new GetAllBranchesClientController(clientService)
const getAllBranchesClientMinController = new GetAllBranchesClientMinController(clientService)
const getBranchByIdController = new GetBranchByIdController(clientService)
const updateBranchOfficeController = new UpdateBranchOfficeController(clientService)
const getAllClientsWithBranchesController = new GetAllClientsWithBranchesController(clientService)
const addOperatorToClientController = new AddOperatorToClientController(clientService)
const addOperatorToBranchController = new AddOperatorToBranchController(clientService)
const getAllClientsByOperatorController = new GetAllClientsByOperatorController(clientService)
const getAllClientsWithBranchesByOperatorController = new GetAllClientsWithBranchesByOperatorController(clientService)
const getAllAuditsClientController = new GetAllAuditsClientController(clientService)

export {
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
}