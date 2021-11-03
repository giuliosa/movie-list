export interface RemoteGatewayConfig {
  serverUrl: string
  serverAuthUrl?: string
  staticAuthToken?: string
  interceptor?: 'static' | 'default'
}
