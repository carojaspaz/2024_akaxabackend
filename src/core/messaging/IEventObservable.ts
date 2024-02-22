import { Observable } from 'rxjs';

export interface IEventObservable<T> {
    ofType(...events: any[]): Observable<T>;
}