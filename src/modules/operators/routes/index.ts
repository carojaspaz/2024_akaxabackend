import * as express from 'express';
import { auth } from '../../../core'
import {
    createOperatorNaturalController,
    createOperatorLegalController,
    getAllOperatorsController,
    getByIdOperatorController,
    toggleApproveOperatorController,
    updatePictureProfileController,
    updateAddressOperatorController,
} from '../controllers'

const multer = require('multer')
const upload = multer({ dest: 'src/uploads'})

const operatorRouter = express.Router()

operatorRouter.post('/operator/natural', auth,
    (req, res) => createOperatorNaturalController.execute(req, res))

operatorRouter.post('/operator/legal', auth,
    (req, res) => createOperatorLegalController.execute(req, res))

operatorRouter.get('/operator', auth,
    (req, res) => getAllOperatorsController.execute(req, res))

operatorRouter.get('/operator/:id', auth,
    (req, res) => getByIdOperatorController.execute(req, res))

operatorRouter.patch('/operator/pic/:id', auth, upload.single('profile'),
    (req, res) => updatePictureProfileController.execute(req, res))

operatorRouter.patch('/operator/address/:id', auth, 
    (req, res) => updateAddressOperatorController.execute(req, res))    

operatorRouter.patch('/operator/toggleApprove/:id', auth,
    (req, res) => toggleApproveOperatorController.execute(req, res))

export { operatorRouter }