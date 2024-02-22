import { CreateProfileOperatorController } from './create.profile.operator.controllers'
import { CreateProfilePartnerController } from './create.profile.partner.controller'
import { UpdateProfileOperatorController } from './update.profile.operator.controller'
import { UpdateProfileAdminController } from './update.profile.admin.controller'
import { CreateProfileAdminController } from './create.profile.admin.controller'
import { GetByEmailProfileController} from './get.by.email.profile.controller'
import { UpdatePictureProfileController } from './update.picture.profile.controller'
import { GetAllProfilesController  } from './get.all.profiles.controller'
import { GetByIdProfileController } from './get.by.id.profile.controller'
import { UpdateAddressProfileController } from './update.profile.address.controller'
import { GetAllOperatorProfilesController } from './get.all.operator.profiles.controller'
import { GetAllOperatorAuditProfilesController } from './get.all.operator.audit.profiles.controller'
import { GetAllOperatorConsultancyProfilesController } from './get.all.operator.consultancy.profiles.controller'
import { GetAllOperatorTeachingProfilesController } from './get.all.operator.teaching.profiles.controller'
import { UploadPartnerEvidenceController } from './upload.evidence.profile.partner.controller'
import { AddEvidenceOperatorController } from './add.evidence.operator.pofile.controller'
import { DeleteEvidenceOperatorController } from './delete.evidence.operator.profiel.controller'
import { GetAllOperatorProfilesByParentController } from './get.all.operator.profiles.by.parent.controller'
import { GetAllOperatorParentProfilesController } from './get.all.operator.parent.controller'
import { ToggleApprovePartnerController } from './toggle.approve.partner.controller'
import { UpdateProfileClientController } from './update.profile.client.controller'
import { UpdateProfilePartnerController } from './update.profile.partner.controller'

import { ProfileService } from '../services/profile.service'

const profileService = new ProfileService()

const createProfileOperatorController = new CreateProfileOperatorController(profileService)
const createProfilePartnerController = new CreateProfilePartnerController(profileService)
const updateProfileOperatorController = new UpdateProfileOperatorController(profileService)
const updateProfileAdminController =  new UpdateProfileAdminController(profileService)
const createProfileAdminController = new CreateProfileAdminController(profileService)
const getByEmailProfileController = new GetByEmailProfileController(profileService)
const updatePictureProfileController = new UpdatePictureProfileController(profileService)
const getAllProfilesController = new GetAllProfilesController(profileService)
const getByIdProfileController = new GetByIdProfileController(profileService)
const updateAddressProfileController = new UpdateAddressProfileController(profileService)
const getAllOperatorProfilesController = new GetAllOperatorProfilesController(profileService)
const getAllOperatorAuditProfilesController = new GetAllOperatorAuditProfilesController(profileService)
const getAllOperatorConsultancyProfilesController = new GetAllOperatorConsultancyProfilesController(profileService)
const getAllOperatorTeachingProfilesController = new GetAllOperatorTeachingProfilesController(profileService)
const uploadPartnerEvidenceController = new UploadPartnerEvidenceController(profileService)
const addEvidenceOperatorController = new AddEvidenceOperatorController(profileService)
const deleteEvidenceOperatorController = new DeleteEvidenceOperatorController(profileService)
const getAllOperatorProfilesByParentController = new GetAllOperatorProfilesByParentController(profileService)
const getAllOperatorParentProfilesController = new GetAllOperatorParentProfilesController(profileService)
const toggleApprovePartnerController = new ToggleApprovePartnerController(profileService)
const updateProfileClientController = new UpdateProfileClientController(profileService)
const updateProfilePartnerController = new UpdateProfilePartnerController(profileService)


export {        
    createProfileOperatorController,
    createProfilePartnerController,
    updateProfileOperatorController,
    updatePictureProfileController,
    updateProfileAdminController,
    createProfileAdminController,
    getByEmailProfileController,    
    getAllProfilesController,
    getByIdProfileController,
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
}