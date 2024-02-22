import { inspectionCategoryRepository } from '../repository'
import { InspectionCategoryDto, InspectionCategoryItemDto, FilterDto, EditInspectionCategoryDto, EditInspectionCategoryItemDto } from '../dtos';

export class InspectionCategoryService {    

    async CreateCategory(category: InspectionCategoryDto): Promise<any> {                    
        return await inspectionCategoryRepository.save(category)
    }

    async UpdateCategory(id: string, category: EditInspectionCategoryDto): Promise<any> {                    
        return await inspectionCategoryRepository.update(id, category)
    }

    async UdateCategoryItem(id: string, item: EditInspectionCategoryItemDto): Promise<any> {
        return await inspectionCategoryRepository.updateItem(id, item)
    }

    async CreateCategoryItem(categoryItem: InspectionCategoryItemDto): Promise<any> {                    
        return await inspectionCategoryRepository.saveItem(categoryItem)
    }

    async GetAllCategories(filter?: FilterDto): Promise<any> {
        return await inspectionCategoryRepository.getAll(filter)
    }

    async GetByIdCategory(id: string): Promise<any> {
        return await inspectionCategoryRepository.getById(id)
    }

    async GetCategoryItems(id: string): Promise<any> {
        return await inspectionCategoryRepository.getItemCategory(id)
    }

    async GetAllCategoryItems(): Promise<any> {
        return await inspectionCategoryRepository.getAllItemCategory()
    }

    async GetCategoryItemById(id: string): Promise<any> {
        return await inspectionCategoryRepository.getItemById(id)
    }
}