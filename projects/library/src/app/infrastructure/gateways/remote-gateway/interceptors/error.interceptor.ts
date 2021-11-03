import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { Injectable } from '@angular/core'

import {
  BaseError,
  ConflictError,
  GatewayTimeoutError,
  InvalidationReason,
  NotAuthorizedError,
  NotFoundError,
  OfflineError,
  ServiceUnavailableError,
  UnknownError,
  ValidationError,
} from 'projects/library/src/app/domain/model/errors'
import { MessageHolder, MessageType } from 'projects/library/src/app/domain/model/message'
import { from, Observable, Subscriber, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

export enum HttpStatusCode {
  /* 200 family */
  Ok = 200,
  /* 400 family */
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  UnprocessableEntity = 422,
  /* 500 family */
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
}

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    return next.handle(req).pipe(
      catchError((err: any) => {
        if (!err.status) {
          return throwError(new OfflineError())
        }
        if (err.status === HttpStatusCode.Unauthorized) {
          return from(next.handle(req)).pipe(
            map(a => a),
            catchError((error: any) => this.handleError(error)),
          )
        }
        return this.handleError(err)
      }),
    )
  }

  private handleError(err: any) {
    if (err instanceof HttpErrorResponse) {
      if (err.status === HttpStatusCode.Unauthorized) {
        return throwError(new NotAuthorizedError(err))
      }
      if (err.status === HttpStatusCode.Forbidden) {
        return throwError(new NotAuthorizedError(err))
      }
      if (err.status === HttpStatusCode.Conflict) {
        return throwError(new ConflictError(err.error.message, err.error.messageParameters))
      }
      if (err.status === HttpStatusCode.ServiceUnavailable) {
        return throwError(
          new ServiceUnavailableError(err.error.message, err.error.messageParameters),
        )
      }
      if (err.status === HttpStatusCode.NotFound) {
        return throwError(new NotFoundError(err.error.message, err.error.messageParameters))
      }
      if (err.status === HttpStatusCode.GatewayTimeout) {
        return throwError(new GatewayTimeoutError())
      }
      if (err.status === HttpStatusCode.UnprocessableEntity) {
        return this.handleValidationError(err)
      }
      return this.handleHttpResponseError(err)
    }
    return throwError(new Error(err))
  }

  private handleValidationError(errorResponse: HttpErrorResponse): Observable<ValidationError> {
    if (errorResponse.error instanceof Blob) {
      const blob = errorResponse.error as Blob

      if (blob.type === 'application/json') {
        return new Observable<ValidationError>((observer: Subscriber<ValidationError>): void => {
          const fr = new FileReader()

          fr.onload = () => {
            const parsedError = JSON.parse(fr.result as string)

            const validationError = new ValidationError()

            const reasons = parsedError.reasons as Array<MessageHolder>

            validationError.addReasons(
              reasons.map(
                f => new InvalidationReason(MessageType.Error, f.message, f.messageParameters),
              ),
            )

            observer.error(validationError)
          }

          fr.onerror = () => {
            observer.error(fr.error)
          }

          fr.readAsText(errorResponse.error)
        })
      }
      return throwError(new UnknownError(errorResponse.message))
    }
    const reasons = errorResponse.error.reasons as Array<MessageHolder>
    const validationError = new ValidationError()

    validationError.addReasons(
      reasons.map(f => new InvalidationReason(MessageType.Error, f.message, f.messageParameters)),
    )

    return throwError(validationError)
  }

  private handleHttpResponseError(err: HttpErrorResponse): Observable<Error> {
    if (err.error) {
      if (err.error instanceof Blob) {
        return this.handleBlobResponse(err)
      }
      if (err.error.exceptionMessage) {
        return throwError(new UnknownError(err.error.exceptionMessage))
      }
      if (err.error.message) {
        return throwError(new UnknownError(err.error.message, err.error.messageParameters))
      }
      if (err.error.error_description) {
        return throwError(new UnknownError(err.error.error_description))
      }
    }
    return throwError(new UnknownError(err.message))
  }

  private handleBlobResponse(err: HttpErrorResponse): Observable<BaseError> {
    const blob = err.error as Blob

    if (blob.type === 'application/json') {
      return new Observable<BaseError>((observer: Subscriber<BaseError>): void => {
        const fr = new FileReader()

        fr.onload = () => {
          const parsedError = JSON.parse(fr.result as string)
          observer.error(new UnknownError(parsedError.message, parsedError.messageParameters))
        }

        fr.onerror = () => {
          observer.error(fr.error)
        }

        fr.readAsText(err.error)
      })
    }
    return throwError(new UnknownError(err.message))
  }
}

export const errorHandlerInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorHandlerInterceptor,
  multi: true,
}
