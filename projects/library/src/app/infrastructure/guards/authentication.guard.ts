import { Inject, Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthenticationGateway } from "../gateways/authentication-gateway/authentication-gateway";
import { remoteGatewayConfigToken } from "../gateways/remote-gateway/injection-keys";
import { RemoteGatewayConfig } from "../gateways/remote-gateway/remote-gateway-config";
@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationGateway: AuthenticationGateway,
    @Inject(remoteGatewayConfigToken) private remoteGatewayConfig: RemoteGatewayConfig,
  ) {}

  canActivate(): Promise<boolean> | boolean{
    return this.isUserAuthorized()
  }

  private isUserAuthorized(): Promise<boolean> | boolean {
    if (
      this.remoteGatewayConfig.interceptor === 'default' &&
      !this.authenticationGateway.isAuthenticated
    ) {
      return this.router.navigate(['/authentication'])
    }
    return true
  }
}
