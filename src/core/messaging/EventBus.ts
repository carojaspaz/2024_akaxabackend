import { ObservableBus } from './ObservableBus';
import { IEventBus } from "./IEventBus";
import { IEvent, IEventHandler } from "../domain/events";
import { CommandBus } from '../messaging/CommandBus';
import { DefaultPubSub } from './utils/DefaultPubSub';
import { Type } from './type.interface';

import { Either, GenericAppError, Result, left, right } from "../logic";
import { MessagingErrors } from './messaging.errors';



type Response = Either<
    GenericAppError.UnexpectedError |
    MessagingErrors.UnregisteredDomainCommand,    
    Result<void>>

export declare type EventHandlerMetaType = Type<IEventHandler<IEvent>>;
export class EventBus extends ObservableBus<IEvent> implements IEventBus{
    private readonly _commandBus : CommandBus;    
    private _publisher : any;
    /**
     *
     */
    constructor(commandBus: CommandBus) {
        super();
        this._commandBus = commandBus;

    }
    
    useDefaultPublisher(){    
        const pubSub  = new DefaultPubSub();
        pubSub.bridgeEventsTo(this.subject$);
        this._publisher = pubSub;
    }
    
    publish<T extends IEvent>(event: T) {
        this._publisher.publish(event);
    }    
}