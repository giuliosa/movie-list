import { Inject, Injectable } from '@angular/core'

import { serverAuthUrlToken } from '../remote-gateway/injection-keys'
import { ApplicationKey } from '../remote-gateway/local-storage.enum'
import { LocalStorageRepository } from '../remote-gateway/local.storage.repository'

@Injectable()
export class AuthenticationGateway {
  constructor(
    private localStorageRepository: LocalStorageRepository,
    @Inject(serverAuthUrlToken) readonly serverLoginUrl: string,
  ) {}

  public authenticate(tenantId: string, token: string, companyId: string) {
    this.localStorageRepository.set(ApplicationKey.TenantId, tenantId)
    this.localStorageRepository.set(ApplicationKey.Token, token)
    this.localStorageRepository.set(ApplicationKey.CompanyId, companyId)
  }

  public unauthenticated() {
    this.localStorageRepository.remove(ApplicationKey.TenantId)
    this.localStorageRepository.remove(ApplicationKey.Token)
    this.localStorageRepository.remove(ApplicationKey.Company)
  }

  public get isAuthenticated(): boolean {
    return (
      this.localStorageRepository.has(ApplicationKey.TenantId) &&
      this.localStorageRepository.has(ApplicationKey.Token) &&
      this.localStorageRepository.has(ApplicationKey.CompanyId)
    )
  }

  public getToken(): string {
    return this.localStorageRepository.get(ApplicationKey.Token)
  }

  public getTenantId(): string {
    return this.localStorageRepository.get(ApplicationKey.TenantId)
  }

  public getCompanyId(): string {
    return this.localStorageRepository.get(ApplicationKey.CompanyId)
  }
}
