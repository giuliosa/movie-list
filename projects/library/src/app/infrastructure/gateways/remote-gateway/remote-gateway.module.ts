import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { ModuleWithProviders, NgModule } from '@angular/core'

import { AuthenticationGuard } from '../../guards/authentication.guard'
import { AuthenticationGateway } from '../authentication-gateway/authentication-gateway'
import {
  remoteGatewayConfigToken,
  serverAuthUrlToken,
  serverStaticAuthToken,
  serverUrlToken,
} from './injection-keys'
import { StaticAuthInterceptor } from './interceptors/static-auth.interceptor'
import { LocalStorageRepository } from './local.storage.repository'
import { RemoteGatewayConfig } from './remote-gateway-config'
import { RemoteGateway } from './remote.gateway'

@NgModule({
  providers: [RemoteGateway, AuthenticationGateway, AuthenticationGuard, LocalStorageRepository],
})
export class RemoteGatewayModule {
  static forRoot(config: RemoteGatewayConfig): ModuleWithProviders<RemoteGatewayModule> {
    return {
      ngModule: RemoteGatewayModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          // useClass: config.interceptor === 'static' ? StaticAuthInterceptor : AuthInterceptor,
          useClass: StaticAuthInterceptor,
          multi: true,
        },
        {
          provide: serverUrlToken,
          useValue: config.serverUrl,
        },
        {
          provide: serverAuthUrlToken,
          useValue: config.serverAuthUrl,
        },
        {
          provide: serverStaticAuthToken,
          useValue: config.staticAuthToken,
        },
        {
          provide: remoteGatewayConfigToken,
          useValue: config,
        },
      ],
    }
  }
}
