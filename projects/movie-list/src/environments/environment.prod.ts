import { RemoteGatewayConfig } from 'projects/library/src/app/infrastructure/gateways/remote-gateway/remote-gateway-config'

const config = <RemoteGatewayConfig>{
  serverUrl: 'https://api.themoviedb.org/3',
}

export const environment = {
  production: false,
  remoteGatewayConfig: config,
  apiToken: '<YOUR TOKEN HERE>',
}
