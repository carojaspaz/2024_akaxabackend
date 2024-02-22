import { IDto } from '../infra/dto'
export interface Mapper {
    // public static toDomain (raw: any): T;
    toDto: (t: any) => IDto;
    toPersistence: (t: IDto) => any;    
}