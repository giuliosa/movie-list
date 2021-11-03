/* eslint-disable */
import { HttpErrorResponse } from '@angular/common/http'

import { Observable, of, OperatorFunction } from 'rxjs'
import { catchError, map, startWith, tap } from 'rxjs/operators'

export interface IQueryResult<T> {
  readonly data?: T
  readonly errors?: ReadonlyArray<IQueryError>
  readonly loading: boolean
  readonly request: object
  readonly hasErrors: boolean

  map<R>(fn: (data: T) => R): IQueryResult<R>
}

export class QueryResult<T> implements IQueryResult<T> {
  constructor(
    public readonly request: object,
    public readonly loading: boolean,
    public readonly data?: T,
    public readonly errors?: ReadonlyArray<IQueryError>,
  ) {}

  get hasErrors(): boolean {
    return this.errors?.length > 0
  }

  public map<R>(fn: (data: T) => R): IQueryResult<R> {
    return new QueryResult(
      this.request,
      this.loading,
      this.data ? fn(this.data) : null,
      this.errors,
    )
  }
}

export interface IQueryError {
  readonly message: string
}

export class QueryError implements IQueryError {
  constructor(private errorMessage: string) {}

  get message(): string {
    return this.errorMessage || 'MESSAGE.UNEXPECTED_ERROR'
  }
}

export const asQueryResult = <T>() => {
  return (source: Observable<T>): Observable<IQueryResult<T>> => {
    return source.pipe(
      map(data => new QueryResult(null, false, data)),
      catchError((err: HttpErrorResponse) => {
        const { error } = err
        let message = ''
        if (error?.message) {
          message = error?.message
        } else if (error?.validations) {
          message = error?.validations[0]?.message
        }
        return of(new QueryResult(null, false, null, [new QueryError(message)]))
      }),
      startWith(new QueryResult<T>(null, true)),
    )
  }
}

export const tapResult = <T>(work: (value: IQueryResult<T>) => void) => {
  return (source: Observable<IQueryResult<T>>): Observable<IQueryResult<T>> => {
    return source.pipe(
      tap(result => {
        if (result.loading) return

        work(result)
      }),
    )
  }
}

export function mapResult<T, R>(
  transform: (value: IQueryResult<T>) => IQueryResult<R>,
): OperatorFunction<IQueryResult<T>, IQueryResult<R>> {
  return (source: Observable<IQueryResult<T>>): Observable<IQueryResult<R>> => {
    return source.pipe(
      map(result => {
        if (result.loading) return new QueryResult(null, true)

        return transform(result)
      }),
    )
  }
}

export function mapResults<R>(
  transform: (value: IQueryResult<any>[]) => IQueryResult<R>,
): OperatorFunction<IQueryResult<any>[], IQueryResult<R>> {
  return (source: Observable<IQueryResult<any>[]>): Observable<IQueryResult<R>> => {
    return source.pipe(
      map(result => {
        if (result.some(r => r.loading)) return new QueryResult(null, true)

        return transform(result)
      }),
    )
  }
}
