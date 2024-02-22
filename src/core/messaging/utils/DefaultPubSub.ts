import { Subject } from 'rxjs';
import { IEvent } from '../../domain';
import { IEventPublisher } from '../IEventPublisher';
import { IMessageSource }  from '../IMessageSource';

export class DefaultPubSub implements IEventPublisher, IMessageSource {
    private subject$ : any;
    
    publish<T extends IEvent>(event: IEvent): void {
        if(!this.subject$) {
            throw new Error('Invalid underlying subject (call bridgeEventsTo())');
        }
    }
    bridgeEventsTo<T extends IEvent>(subject: Subject<T>): void{
        this.subject$ = subject;
    }
}