import 'reflect-metadata';
import { IEvent } from './IEvent';
import { Config } from '../../constants/cqrs.config';
const EventHandler = (event: IEvent) => {
    return (target: any) => {
        Reflect.defineMetadata(Config.cqrs.EVENTS_HANDLER_METADATA, event, target);
    }
};

export { EventHandler };