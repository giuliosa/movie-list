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

  public authenticate(token: string) {
    this.localStorageRepository.set(ApplicationKey.Token, token)
  }

  public unauthenticated() {
    this.localStorageRepository.remove(ApplicationKey.Token)
  }

  public get isAuthenticated(): boolean {
    return this.localStorageRepository.has(ApplicationKey.Token)
  }

  public getToken(): string {
    return this.localStorageRepository.get(ApplicationKey.Token)
  }
}
