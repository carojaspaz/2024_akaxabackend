import * as express from 'express';
import { auth } from '../../../core'
import {    
    createProfileOperatorController,
    createProfilePartnerController,
    updateProfileAdminController,
    createProfileAdminController,
    getByEmailProfileController,
    updatePictureProfileController,
    getAllProfilesController,
    getByIdProfileController,
    updateProfileOperatorController,
    updateAddressProfileController,
    getAllOperatorProfilesController,
    getAllOperatorAuditProfilesController,
    getAllOperatorConsultancyProfilesController,
    getAllOperatorTeachingProfilesController,
    uploadPartnerEvidenceController,
    addEvidenceOperatorController,
    deleteEvidenceOperatorController,
    getAllOperatorProfilesByParentController,
    getAllOperatorParentProfilesController,
    toggleApprovePartnerController,
    updateProfileClientController,
    updateProfilePartnerController
} from '../controllers'

const multer = require('multer')
const upload = multer({ dest: 'src/uploads'})

const profileRouter = express.Router()

profileRouter.get('/profile/', auth,
    (req, res) => getAllProfilesController.execute(req, res))

profileRouter.get('/profile/operators/', auth,
    (req, res) => getAllOperatorProfilesController.execute(req, res))

profileRouter.get('/profile/operators/parents/', auth,
    (req, res) => getAllOperatorParentProfilesController.execute(req, res))

profileRouter.get('/profile/operators/audit/', auth,
    (req, res) => getAllOperatorAuditProfilesController.execute(req, res))

profileRouter.get('/profile/operators/consultancy/', auth,
    (req, res) => getAllOperatorConsultancyProfilesController.execute(req, res))

profileRouter.get('/profile/operators/teaching/', auth,
    (req, res) => getAllOperatorTeachingProfilesController.execute(req, res))

profileRouter.get('/profile/:id', auth,
    (req, res) => getByIdProfileController.execute(req, res))

profileRouter.get('/profile/byEmail/:email', auth,
    (req, res) => getByEmailProfileController.execute(req, res))

profileRouter.post('/profile/operator/', auth,
    (req, res) => createProfileOperatorController.execute(req, res))

profileRouter.post('/profile/partner/', auth,
    (req, res) => createProfilePartnerController.execute(req, res))

profileRouter.put('/profile/operator/:id', auth,
    (req, res) => updateProfileOperatorController.execute(req, res))

profileRouter.put('/profile/partner/:id', auth,
    (req, res) => updateProfilePartnerController.execute(req, res))

profileRouter.post('/profile/admin/', auth,
    (req, res) => createProfileAdminController.execute(req, res))

profileRouter.put('/profile/admin/:id', auth,
    (req, res) => updateProfileAdminController.execute(req, res))

profileRouter.put('/profile/client/:id', auth,
    (req, res) => updateProfileClientController.execute(req, res))

profileRouter.post('/profile/pic/:id', auth, upload.single('profile'),
    (req, res) => updatePictureProfileController.execute(req, res))

profileRouter.post('/profile/address/:id', auth,
    (req, res) => updateAddressProfileController.execute(req, res))

profileRouter.post('/profile/partner/docevidence/:type/:id', auth, upload.single('evidence'),
    (req, res) => uploadPartnerEvidenceController.execute(req, res))

profileRouter.post('/profile/operator/evidence/:type/:id', auth,
    (req, res) => addEvidenceOperatorController.execute(req, res))

profileRouter.patch('/profile/partner/toggleApprove/:id', auth,
    (req, res) => toggleApprovePartnerController.execute(req, res))

profileRouter.patch('/profile/operator/evidence/', auth,
    (req, res) => deleteEvidenceOperatorController.execute(req, res))

profileRouter.get('/profile/operators/byparent/:id', auth,
    (req, res) => getAllOperatorProfilesByParentController.execute(req, res))

export { profileRouter }