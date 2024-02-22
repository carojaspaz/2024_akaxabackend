import { AddressDto } from '../../../core'
import { clientRepository } from '../repository'
import { ClientDto, UpdateClientDto, SectorsDto, BranchOfficeDto } from '../dtos'
import { ProfileBaseDto, UpdateProfileBaseDto } from '../../profiles/dtos'

export class ClientService {
    async CreateClient(client: ClientDto):Promise<any> {
        return await clientRepository.save(client)
    }

    async GetAllClients():Promise<any> {
        return await clientRepository.getAll()
    }
    
    async GetAllClientsByOperator(id: string):Promise<any> {
        return await clientRepository.getAllByOperator(id)
    }

    async GetClientById(id:string):Promise<any> {
        return await clientRepository.getById(id)
    }

    async UpdateClient(id:string, client: ClientDto):Promise<any> {
        return await clientRepository.update(id, client)
    }

    async AddUpdateAddress(id:string, address: AddressDto):Promise<any> {
        return await clientRepository.updateClientAddress(id, address)
    }

    async AddUpdateSectors(id:string, sectors:SectorsDto[]):Promise<any> {
        return await clientRepository.updateClientSectors(id, sectors)
    }

    async ToggleActiveClient(id:string): Promise<any> {
        return await clientRepository.toggleActiveClient(id)
    }

    async CreateProfileClient(id:string, profile: ProfileBaseDto): Promise<any> {
        return await clientRepository.saveProfile(id, profile)
    }

    async UpdateProfileClient(id:string, profile:UpdateProfileBaseDto): Promise<any> {
        return await clientRepository.updateProfile(id, profile)
    }

    async AddUpdateAddressProfile(id: string, mainAddress: boolean, address: AddressDto){
        return await clientRepository.updateProfileAddress(id, mainAddress, address)
    }

    async CreateBranchOffice(branchOffice: BranchOfficeDto){
        return await clientRepository.saveBranchOffice(branchOffice)
    }

    async UpdateBranchOffice(id: string, branchOffice: BranchOfficeDto){
        return await clientRepository.updateBranchOffice(id, branchOffice)
    }

    async GetBranchesOfficeByIdClient(idClient:string){
        return await clientRepository.getAllBranchesById(idClient)
    }

    async GetBranchesOfficeByIdClientMin(idClient:string){
        return await clientRepository.getAllBranchesByIdMin(idClient)
    }

    async GetBranchOfficeById(id: string){
        return await clientRepository.getBranchById(id)
    }

    async ToggleBrancheoffice(id: string){
        return await clientRepository.toggleActiveBranch(id)
    }

    async GetClientsAndBranches(){
        return await clientRepository.getClientsAndBranches()
    }

    async GetClientsAndBranchesByOperator(id: string){
        return await clientRepository.getClientsAndBranchesByOperator(id)
    }

    async AddOperatorToClient(idClient: string, idOperator: string){
        return await clientRepository.addOperatorToClient(idClient, idOperator)
    }

    async AddOperatorToBranch(idBranch: string, idOperator: string){
        return await clientRepository.addOperatorToBranchOffice(idBranch, idOperator)
    }

    async GetAuditsClient(idClient: string): Promise<any>{
        return await clientRepository.getAllAudits(idClient)
    }
}