import { Component, Inject, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'

import { AuthenticationGateway } from '../../infrastructure/gateways/authentication-gateway/authentication-gateway'
import { serverAuthUrlToken } from '../../infrastructure/gateways/remote-gateway/injection-keys'

@Component({
  selector: 'lib-authentication',
  templateUrl: './authentication.component.html',
})
export class LibAuthenticationComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticationGateway: AuthenticationGateway,
    @Inject(serverAuthUrlToken) readonly serverLoginUrl: string,
  ) {}

  ngOnInit() {
    // TODO Arrumar isso daqui
    console.log('entrou no authentication')
    const { token } = this.toNameConvention(this.activatedRoute.snapshot.queryParams)
    if (token) {
      this.authenticationGateway.authenticate(token)
      this.router.navigate(['/'])
    }
  }

  public toNameConvention(params: Params): Params {
    const paramsNameConvention: Params = {}
    Object.keys(params).forEach(p => {
      paramsNameConvention[p.replace('ID', 'Id')] = params[p]
    })

    return paramsNameConvention
  }
}
