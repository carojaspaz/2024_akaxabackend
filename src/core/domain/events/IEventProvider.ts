import { IEvent } from './IEvent';

export interface IEventProvider{
    loadsFromHistory(history: IEvent[]) : any;
    getUncommittedChanges(): IEvent[];
}