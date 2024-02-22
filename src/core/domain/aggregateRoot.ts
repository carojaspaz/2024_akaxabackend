import { IEventProvider } from './events/IEventProvider';
import { IEvent } from './events/IEvent';
import { Entity } from './utils/entity';
import { UniqueEntityID } from './utils/uniqueEntityId';

export abstract class AggregateRoot<T> extends Entity<T> implements IEventProvider{  
  private _events: IEvent[];
  public autoCommit : boolean;

  constructor(props: T, id?: UniqueEntityID){
    super(props, id);
    this.autoCommit = false;
    this._events = [];
  }

  publish(event: IEvent) {}

  commit(): void{
    this._events.forEach((event) => this.publish(event));
    this._events.length = 0;
  }

  uncommit(): void{
    this._events.length = 0;
  }

  getUncommittedChanges(): IEvent[] {
    return this._events;
  }

  loadsFromHistory(history: IEvent[]) {
    history.forEach((item) => {
      this.ApplyChange(item, false);
    });    
  }    
    
  ApplyChange(event: IEvent, isFromHistory = false): void{
    if(!isFromHistory && !this.autoCommit){
      this._events.push(event);
      const thisClass = Object.getPrototypeOf(this);
      const eventClass = Object.getPrototypeOf(event);
      console.info(`[Domain Event Created]:`, thisClass.constructor.name, '==>', eventClass.constructor.name)
    }
    this.autoCommit && this.publish(event);
    const handler = this.getEventHandler(event);
    handler && handler.call(this, event);
  } 
  
  getEventHandler(event: IEvent){
    const handler = `on${this.getEventName(event)}`;
    return (this as any)[handler];
  }

  getEventName(event: IEvent){
    const { constructor } = Object.getPrototypeOf(event);
    return constructor.name;
  }
}