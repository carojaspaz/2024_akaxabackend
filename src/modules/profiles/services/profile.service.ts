import { loadProfilePic, AddressDto, loadStudyEvience, loadExpreienceEvience, deleteStudyEvience, deleteExperienceEvience } from '../../../core'
import { profileRepository } from '../repository'
import { ProfileBaseDto, ProfilePartnerDto, UpdateProfileBaseDto, ProfileOperatorDto, UpdateProfileOperatorDto, UpdateProfilePartnerDto } from '../dtos'

export class ProfileService {
    async CreateProfileAdmin(profile: ProfileBaseDto): Promise<any> {
        return await profileRepository.saveAdmin(profile)        
    }

    async UpdateProfileAdmin(id: string, profile: UpdateProfileBaseDto): Promise<any> {
        return await profileRepository.updateAdmin(id, profile)
    }

    async CreateProfileOperator(profile: ProfileOperatorDto): Promise<any> {
        return await profileRepository.saveOperator(profile)
    }

    async CreateProfilePartner(profile:ProfilePartnerDto): Promise<any> {
        return await profileRepository.savePartner(profile)
    }

    async UpdateProfileOperator(id: string, profile: UpdateProfileOperatorDto): Promise<any> {
        return await profileRepository.updateOperator(id, profile)
    }

    async UpdateProfilePartner(id: string, profile: UpdateProfilePartnerDto): Promise<any> {
        return await profileRepository.updatePartner(id, profile)
    }

    async UpdateClientAdmin(id: string, profile: UpdateProfileBaseDto): Promise<any> {
        return await profileRepository.updateClient(id, profile)
    }

    async GetAllProfiles(): Promise<any> {
        return await profileRepository.getAll();
    }

    async GetAllOperatorsProfiles(): Promise<any> {
        return await profileRepository.getAllOperators()
    }

    async GetAllOperatorsParentProfiles(): Promise<any> {
        return await profileRepository.getAllOperatorsParent()
    }

    async GetAllOperatorsProfilesByParent(id: string): Promise<any> {
        return await profileRepository.getAllOperatorsByParent(id)
    }

    async GetAllOperatorsByType(type: string): Promise<any> {
        return await profileRepository.getAllOperatorsByType(type)
    }

    async GetProfileById(id: string): Promise<any> {
        return await profileRepository.getById(id)
    }

    async GetProfileByEmail(email: string): Promise<any> {
        return await profileRepository.getByEmail(email)
    }

    async UploadFile(file: any, id: string, name: any): Promise<any> {
        return await loadProfilePic(file, id, name)            
    }

    async UpdatePicProfile(id: string, url: any){
        return await profileRepository.updateProfilePic(id, url)
    }

    async AddUpdateAddressProfile(id: string, mainAddress: boolean, address: AddressDto){
        return await profileRepository.updateProfileAddress(id, mainAddress, address)
    }
    async UploadStudyEvidence(profileId:string, file: any, name: any): Promise<any> {
        return await loadStudyEvience(profileId, file, name)
    }
    async UploadXpEvidence(profileId:string, file: any, name: any): Promise<any> {
        return await loadExpreienceEvience(profileId, file, name)
    }
    async AddEvidenceProfile(idProfile: string, type: string, raw: any){
        return await profileRepository.saveEvidence(idProfile, type, raw)
    }
    async RemoveEvidenceProfile(type: string, idProfile: string, idEvidence: string){
        return await profileRepository.deleteEvidence(type, idProfile, idEvidence)
    }
    async ToggleApprovePartner(id: string){
        return await profileRepository.toggleApprovePartner(id)
    }
    async ToggleActivePartner(id: string){
        return await profileRepository.toggleActivePartner(id)
    }
    DeleteStudyEvidence(idProfile: string, fileName: string){
        deleteStudyEvience(idProfile, fileName)
    }
    DeleteExperienceEvidence(idProfile: string, fileName: string){
        deleteExperienceEvience(idProfile, fileName)
    }
}