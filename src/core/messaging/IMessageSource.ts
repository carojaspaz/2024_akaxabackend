import { Subject } from 'rxjs';
import { IEvent } from '../domain';
export interface IMessageSource {
    bridgeEventsTo<T extends IEvent>(subject: Subject<T>): any;
}