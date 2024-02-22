import { IEvent } from '../domain';
export interface IEventPublisher {
    publish<T extends IEvent>(event: T): any;
}