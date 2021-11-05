import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable, Inject } from '@angular/core'

import { Observable } from 'rxjs'
import { AuthenticationGateway } from '../../authentication-gateway/authentication-gateway'

import { serverUrlToken } from '../injection-keys'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authenticationGateway: AuthenticationGateway,
    @Inject(serverUrlToken) readonly serverUrl,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let req = request

    if (req.url.includes(this.serverUrl)) {
      const tokenLocalStorage = this.authenticationGateway.getToken()

      req = req.clone({
        setHeaders: {
          authorization: `Bearer ${tokenLocalStorage}`,
        },
      })
    }

    return next.handle(req)
  }
}
