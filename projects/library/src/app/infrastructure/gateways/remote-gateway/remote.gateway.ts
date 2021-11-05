import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { Router } from '@angular/router'

import { HttpStatusCode } from 'projects/library/src/app/infrastructure/gateways/remote-gateway/interceptors/error.interceptor'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { IQueryResult } from '../../../commons/rx-operators/as-query-result'
import { AuthenticationGateway } from '../authentication-gateway/authentication-gateway'
import { serverUrlToken } from './injection-keys'

type ResponseType = 'arraybuffer' | 'blob' | 'json' | 'text'

@Injectable()
export class RemoteGateway {
  constructor(
    @Inject(serverUrlToken) private url: string,
    private httpClient: HttpClient,
    private router: Router,
    private authenticationGateway: AuthenticationGateway,
  ) {}

  private buildUrl(url: string) {
    let newUrl = url
    if (!!url && url.charAt(0) !== '/') {
      newUrl = `/${url}`
    }
    console.log(`${this.url}${newUrl}?api_key=386f116f8dbb90bc974d638ed5149428`)
    return `${this.url}${newUrl}?api_key=386f116f8dbb90bc974d638ed5149428`
  }

  private handle(response: HttpErrorResponse) {
    if (
      response.status === HttpStatusCode.Forbidden ||
      response.status === HttpStatusCode.Unauthorized
    ) {
      this.authenticationGateway.unauthenticated()
      // TODO: Arrumar a authenticação. Atualmente o componente de autenticação não funciona corretamente
      this.router.navigate(['/autenticat'])
    }
  }

  public download(url: string): Observable<IQueryResult<any>> {
    return this.get(url, null, 'blob')
  }

  public downloadAsPost(url: string, payload: any): Observable<any> {
    return this.httpClient.post(this.buildUrl(url), payload, { responseType: 'blob' })
  }

  public uploadFile(url: string, form: FormData): Observable<any> {
    return this.httpClient.post(this.buildUrl(url), form, {
      reportProgress: true,
      observe: 'events',
    })
  }

  public upload(url: string, formData: FormData): Observable<IQueryResult<any>> {
    return this.post(url, formData)
  }

  //TODO add api_key
  public get(url: string, params?: any, responseType?: ResponseType): Observable<any> {
    return this.request('GET', url, null, params, responseType)
  }

  public delete(url: string, payload?: any, queryParams?: any): Observable<any> {
    return this.request('DELETE', url, payload, queryParams)
  }

  public post(url: string, payload: any): Observable<any> {
    return this.request('POST', url, payload)
  }

  public put(url: string, payload: any): Observable<any> {
    return this.request('PUT', url, payload)
  }

  private request(
    method: string,
    url: string,
    payload: any = null,
    queryParams?: any,
    responseType?: ResponseType,
  ): Observable<any> {
    const params = Object.entries(queryParams || {})
      .filter(([, value]) => value != null && value !== '')
      .reduce(
        (httpParams, [key, value]) => httpParams.append(key, value.toString()),
        new HttpParams(),
      )

    return this.httpClient
      .request(method, this.buildUrl(url), {
        body: payload,
        params,
        responseType,
      })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.handle(err)
          return throwError(err)
        }),
      )
  }
}
