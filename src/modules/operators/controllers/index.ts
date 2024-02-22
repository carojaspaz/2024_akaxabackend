import { CreateOperatorNatural } from './create.operator.natural.controller'
import { CreateOperatorLegal } from './create.operator.legal.controller'
import { GetAllOperatorsController } from './get.all.operators.controller'
import { GetByIdOperatorController } from './get.by.id.operator.controller'
import { UpdatePictureProfileController } from './update.picture.operator.controller'
import { ToggleApproveOperatorController } from './toggle.approve.operator.controller'
import { UpdateAddressOperatorController} from './update.address.operator.controller'

import { OpertorService } from '../services/operator.service'

const operatorService = new OpertorService()

const createOperatorNaturalController = new CreateOperatorNatural(operatorService)
const createOperatorLegalController = new CreateOperatorLegal(operatorService)
const getAllOperatorsController = new GetAllOperatorsController(operatorService)
const getByIdOperatorController = new GetByIdOperatorController(operatorService)
const toggleApproveOperatorController = new ToggleApproveOperatorController(operatorService)
const updatePictureProfileController = new UpdatePictureProfileController(operatorService)
const updateAddressOperatorController = new UpdateAddressOperatorController(operatorService)

export {
    createOperatorNaturalController,
    createOperatorLegalController,
    getAllOperatorsController,
    getByIdOperatorController,
    toggleApproveOperatorController,
    updatePictureProfileController,
    updateAddressOperatorController,
}