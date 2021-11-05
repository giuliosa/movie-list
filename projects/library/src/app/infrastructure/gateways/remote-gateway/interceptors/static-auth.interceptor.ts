import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'

import { Observable } from 'rxjs'

import { serverStaticAuthToken } from '../injection-keys'

@Injectable()
export class StaticAuthInterceptor implements HttpInterceptor {
  constructor(@Inject(serverStaticAuthToken) readonly key: string) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const httpHeaders = req.headers
      // .set('authorization', `Bearer ${this.key}`)
      .set('Authorization', `Bearer 386f116f8dbb90bc974d638ed5149428`)

    const authReq = req.clone({ headers: httpHeaders })

    return next.handle(authReq)
  }
}
