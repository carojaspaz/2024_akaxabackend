import { InspectionCategoryErrors } from './inspection.category.repository.error'
import { Either, GenericAppError, Result, left, right } from '../../../core'


import { InspectionCategoryMap } from '../mappers/inspectionCategoryMap';
import { InspectionCategoryDto, InspectionCategoryItemDto, FilterDto, EditInspectionCategoryDto, EditInspectionCategoryItemDto } from '../dtos'

type Response = Either<
    GenericAppError.UnexpectedError | 
    GenericAppError.NotFoundError |  
    InspectionCategoryErrors.CategoryAlreadyExists |     
    Result<any>,   
    Result<void>>

export interface ISectorRepo {    
    save(category: InspectionCategoryDto): Promise<Response>
    update(id: string, category: EditInspectionCategoryDto): Promise<Response>
    saveItem(itemCategory: InspectionCategoryItemDto): Promise<Response>
    updateItem(id: string, itemCategory: EditInspectionCategoryItemDto): Promise<Response>
    getAll(filter?: FilterDto): Promise<Response>   
    getById(id: string): Promise<Response>
    getItemById(id: string): Promise<Response>
    getItemCategory(id: string) : Promise<Response>
}
export class InspectionCategoryRepository implements ISectorRepo {
    private map: InspectionCategoryMap
    private models: any
    private removeId = { "_id": 0 }

    constructor(models: any){
        this.models = models
        this.map = new InspectionCategoryMap()
    }        
    
    public async getAll(filter?: FilterDto): Promise<Response> {
        try{
            let query = { }
            if(filter.sector){
                query = { sector: filter.sector }
            }
            if(filter.subdivision){
                query = {...query, division: filter.division }
            }
            if(filter.subdivision){
                query = { ...query, subdivision: filter.subdivision}
            }
            if(filter.activity){
                query = { ...query, activity: filter.activity}
            }            
            const categories =  await this.models.InspectionCategory.find(query)
            if(categories.length > 0){
                let viewCategories: any[] = []
                categories.forEach((element: any) => {                    
                    let sector = this.map.toViewCategory(element)
                    viewCategories.push(sector)
                })
                return right(Result.ok<any>(viewCategories)) as Response
            } else {
                return left(new GenericAppError.NotFoundError()) as Response                
            }
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }

    public async getById(id: string): Promise<Response> {
        try{
            const category =  await this.models.InspectionCategory.findById(id)
            if(category){
                let inspectionCategory = this.map.toViewCategory(category)
                return right(Result.ok<any>(inspectionCategory)) as Response                            
            } else {
                return left(new GenericAppError.NotFoundError()) as Response
            }
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }

    public async getItemById(id: string): Promise<Response> {
        try{
            const item =  await this.models.InspectionCategoryItem.findById(id)
            if(item){
                let inspectionCategoryItem = this.map.toViewCategoryItem(item)
                return right(Result.ok<any>(inspectionCategoryItem)) as Response                            
            } else {
                return left(new GenericAppError.NotFoundError()) as Response
            }
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }

    public async getItemCategory(id: string): Promise<Response> {
        try{
            const categoryItems =  await this.models.InspectionCategoryItem
            .find({'inspectionCategory':id})
            .populate('inspectionCategory', 'subject')
            .populate('conditionRisk', 'risk desc')
            .exec()
            if(categoryItems){
                let items: any[] = []
                categoryItems.forEach((element: any) => {                    
                    let item = this.map.toViewCategoryItem(element)
                    items.push(item)
                })                
                return right(Result.ok<any>(items)) as Response                            
            } else {
                return left(new GenericAppError.NotFoundError()) as Response
            }
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }

    public async getAllItemCategory(): Promise<Response> {
        try{
            const categoryItems =  await this.models.InspectionCategoryItem
            .find()
            .populate('inspectionCategory', 'subject')
            .populate('conditionRisk', 'risk')
            .exec()
            if(categoryItems){
                let items: any[] = []
                categoryItems.forEach((element: any) => {                    
                    let item = this.map.toViewCategoryItem(element)
                    items.push(item)
                })                
                return right(Result.ok<any>(items)) as Response                            
            } else {
                return left(new GenericAppError.NotFoundError()) as Response
            }
        } catch(error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }

    public async saveItem(itemCategory: InspectionCategoryItemDto): Promise<Response> {        
        const newCategoryItem = this.models.InspectionCategoryItem
        try{                        
            const rawCategory = this.map.toPersistenceItem(itemCategory)
            const id = await newCategoryItem.schema.methods.CreateCategoryItem(rawCategory);            
            return right(Result.ok<any>(id)) as Response            
        }
        catch(error){                        
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }                          

    public async save(category: InspectionCategoryDto): Promise<Response> {        
        const newCategory = this.models.InspectionCategory
        try{                        
            const rawCategory = this.map.toPersistence(category)
            const id = await newCategory.schema.methods.CreateCategory(rawCategory)
            return right(Result.ok<any>(id)) as Response            
        }
        catch(error){                        
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }      
    
    public async update(id: string, category: EditInspectionCategoryDto): Promise<Response> {        
        const updateCategory = this.models.InspectionCategory
        try{                        
            const updateId = await updateCategory.schema.methods.UpdateCategory(id, category)
            return right(Result.ok<any>(updateId)) as Response            
        }
        catch(error){                        
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }     
    
    public async updateItem(id: string, itemCategory: EditInspectionCategoryItemDto): Promise<Response> {        
        const updateCategoryItem = this.models.InspectionCategoryItem
        try{                        
            const updatedId = await updateCategoryItem.schema.methods.UpdateCategoryItem(id, itemCategory);            
            return right(Result.ok<any>(id)) as Response            
        }
        catch(error){                        
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    } 
}