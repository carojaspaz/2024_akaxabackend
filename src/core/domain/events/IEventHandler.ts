import { IEvent } from './IEvent';

export interface IEventHandler<TEvent extends IEvent> {
  handle(e: TEvent) : any;
}