import { Observable } from 'rxjs';
export declare function reducer<T, R>(initialState: T, reducer: (state: T, action: R) => T): (source: Observable<R>) => Observable<T>;
//# sourceMappingURL=index.d.ts.map