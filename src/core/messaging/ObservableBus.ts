import { Subject, Observable}  from 'rxjs';
import { Type } from './type.interface';
import * as operators from 'rxjs/operators';

import { IEventObservable } from './IEventObservable';

const isEmpty = (array: string | any[]) => !(array && array.length > 0);

export class ObservableBus<T> extends Observable<T> implements IEventObservable<T>{
    protected subject$: Subject<T>;
    /**
     *
     */
    constructor() {
        super();
        this.subject$ = new Subject();
        this.source = this.subject$;
    }
    ofType(...types: Type<any>[]): Observable<T> {
        return this.pipe(operators.filter(event => !isEmpty(types.filter(type => event instanceof type))));
    }
}