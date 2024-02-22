import { loadProfilePic, AddressDto } from '../../../core'
import { operatorRepository } from '../repository'
import { OperatorNaturalDto, OperatorLegalDto } from '../dtos'

export class OpertorService {
   async CreateOperatorNatural(operator: OperatorNaturalDto): Promise<any> {
       return await operatorRepository.createOperatorNatural(operator)
   }
   async CreateOperatorLegal(operator: OperatorLegalDto): Promise<any> {
       return await operatorRepository.createOperatorLegal(operator)
   }
   async GetAll(): Promise<any> {
       return await operatorRepository.getAll()
   }
   async GetById(id: string): Promise<any> {
       return await operatorRepository.getById(id)    
   }
   async AddUpdateAddressOperator(id: string, address: AddressDto): Promise<any> {
       return await operatorRepository.updateOperatorAddress(id, address)
   }
   async UpdatePicOperator(id: string, url: string) {
       return await operatorRepository.updateOperatorPic(id, url)
   }
   async ToggleApproveOperator(id: string){
    return await operatorRepository.toggleApproveOperator(id)
   }
   // HELPERS
   async UploadFile(file: any, id: string, name: any): Promise<any> {
    return await loadProfilePic(file, id, name)            
   }
}