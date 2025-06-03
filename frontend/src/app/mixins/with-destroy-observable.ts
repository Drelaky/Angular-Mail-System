import { OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Constructor } from '../types/rxjs-model';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const WithDestroyObservable = <TBase extends Constructor<object>>(Base: TBase) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // Typescript says "A mixin class must have a constructor with a single rest parameter of type 'any[]'", but it's wrong IMO.
  class extends Base implements OnDestroy {
    protected destroy$: Observable<void>;

    public destroySubject$ = new Subject<void>();

    public constructor(...args: any[]) {
      super(...args);
      this.destroy$ = this.destroySubject$.asObservable();
    }

    public ngOnDestroy(): void {
      this.destroySubject$.next();
      this.destroySubject$.complete();
    }
  };
