import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'

import { Observable } from 'rxjs'

import { serverStaticAuthToken } from '../injection-keys'

@Injectable()
export class StaticAuthInterceptor implements HttpInterceptor {
  constructor(@Inject(serverStaticAuthToken) readonly key: string) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const httpHeaders = req.headers
      .set('authorization', `Bearer ${this.key}`)
      .set('tenantid', 'mockTenantId')
      .set('company', 'mockCompany')
      .set('empresaId', 'mockEmpresaId')
      .set('usuario', 'mockUsuario')
      .set('token', 'mockToken')

    const authReq = req.clone({ headers: httpHeaders })

    return next.handle(authReq)
  }
}
