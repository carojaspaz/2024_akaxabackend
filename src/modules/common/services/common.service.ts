import { ApiConfig } from '../../../core'
import { commonRepository, CommonErrors } from '../repository'
import { CompanyTypeDto, KeyValueDto } from '../dtos'
import { Either, GenericAppError, Result, left, right, 
    parameterTypeArray, ParameterType,
    documentTypesArray, documentTypesArrayEs,
    phoneTypesArray, phoneTypesArrayEs,
    studyLevelTypesArray, studyLevelTypesArrayEs,
    profileTypesArray, profileTypesArrayEs,
    scheduleTypeNamesArray, scheduleTypeNamesArrayEs,
    riskTypeNamesArray, riskTypeNamesArrayEs } from '../../../core'


type Response = Either<
    GenericAppError.UnexpectedError |   
    CommonErrors.ParameterDoesNotExist | 
    Result<any>,    
    Result<void>>

const globalAny:any = global;

export class CommonService {            
    
    async GetParameter(): Promise<any> {  
        return right(Result.ok<string[]>(parameterTypeArray))
    }    

    async GetParametersByCode(code: string): Promise<any> {
        const locale = globalAny.lang        
        const defaultLanguage = locale === ApiConfig.setup.defaultLanguage
        switch(code){
            case ParameterType.documentTypes:
                if(defaultLanguage){
                    return right(Result.ok<any>(documentTypesArrayEs))  as Response
                } else {
                    return right(Result.ok<any>(documentTypesArray)) as Response
                }    
            case ParameterType.phoneTypes:
                    if(defaultLanguage){
                        return right(Result.ok<any>(phoneTypesArrayEs))  as Response
                    } else {
                        return right(Result.ok<any >(phoneTypesArray)) as Response
                    }    
            case ParameterType.studyLevelTypes:            
                if(defaultLanguage){
                    return right(Result.ok<any>(studyLevelTypesArrayEs)) as Response
                } else {
                    return right(Result.ok<any>(studyLevelTypesArray)) as Response
                } 
            case ParameterType.profileTypes:
                if(defaultLanguage){
                    return right(Result.ok<any>(profileTypesArrayEs)) as Response
                } else {
                    return right(Result.ok<any>(profileTypesArray)) as Response
                }   
            case ParameterType.scheduleTypes:
                if(defaultLanguage){
                    return right(Result.ok<any>(scheduleTypeNamesArrayEs)) as Response
                } else {
                    return right(Result.ok<any>(scheduleTypeNamesArray)) as Response
                }   
            case ParameterType.riskTypes:
                if(defaultLanguage){
                    return right(Result.ok<any>(riskTypeNamesArrayEs)) as Response
                } else {
                    return right(Result.ok<any>(riskTypeNamesArray)) as Response
                }                                
            default:
                return left(new CommonErrors.ParameterDoesNotExist(code)) as Response
        }
    }   

    async GetSections(): Promise<any> {

    }

    async GetCountries(): Promise<any> {
        return await commonRepository.getCountries()
    }   

    async GetActiveCountries(): Promise<any> {
        return await commonRepository.getActiveCountries()
    }   

    async GetStatesCountry(countryCode: string): Promise<any>{
        return await commonRepository.getStatesCountries(countryCode)
    }

    async GetMunicipalitiesState(stateCode: string): Promise<any>{
        return await commonRepository.getMunicipalitiesStates(stateCode)
    }

    async GetPopulateCenterMunicipality(municipalityCode: string): Promise<any>{
        return await commonRepository.getPopulateCenterMunicipality(municipalityCode)
    }

    async GetCiiu(): Promise<any> {
        return await commonRepository.getCIIU()
    }

    GetSectorName(sector: string): any {
        return commonRepository.getSector(sector)
    }

    async GetDivisionsBySection(section: string): Promise<any> {
        return await commonRepository.getDivision(section)
    }

    GetDivisionName(sector: string, division: string): any {
        return commonRepository.getDivisionName(sector, division)
    }

    async GetSubdivisionsByDivisionBySection(section: string, division: string): Promise<any> {
        return await commonRepository.getSubDivision(section, division)
    }

    GetSubDivisionName(sector: string, division: string, subDivision: string): any {
        return commonRepository.getSubDivisionName(sector, division, subDivision)
    }

    async GetActivitiesbySubdivisionsByDivisionBySection(section: string, division: string, subdivision: string): Promise<any> {
        return await commonRepository.getActivities(section, division, subdivision)
    }

    GetActivityName(sector: string, division: string, subDivision: string, activity: string): any {
        return commonRepository.getActivityName(sector, division, subDivision, activity)
    }

    GetActivityVerify(): any {
        return commonRepository.getAllActivityVerify()
    }

    GetConditionsRisk(): any {
        return commonRepository.getAllConditionsRisk()
    }

    GetTypesList(): any {
        return commonRepository.getAllTypesList()
    }
    GetRiskList(): any {
        return commonRepository.getAllRiskTypes()
    }
    async CreateCompanyType(type: CompanyTypeDto): Promise<any> {
        return await commonRepository.saveTypeCompany(type)
    }
    async UpdateCompanyType(id: string, type: CompanyTypeDto){
        return await commonRepository.updateTypeCompany(id, type)
    }
    async GetAllTypesCompany(): Promise<any> {
        return await commonRepository.getAllTypesCompany()
    }
    async sendMail(email: string): Promise<any>{  
        return await commonRepository.sendMail(email)
    }
    async saveActivityVerify(activity: string, description: string){
        return await commonRepository.saveActivityVerify(activity, description)
    }
    async toggleActivityVerify(id: string){
        return await commonRepository.toggleActivityVerify(id)
    }

    async getValueKey(key: string, isProd: boolean){
        return await commonRepository.getValueKey(key, isProd)
    }
    
    async setKey(keyValueDto: KeyValueDto){
        return await commonRepository.setKey(keyValueDto)
    }
}