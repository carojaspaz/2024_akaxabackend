import { IEvent } from "../domain/events";

export interface IEventBus{
    publish<T extends IEvent>(event: T): any;
}