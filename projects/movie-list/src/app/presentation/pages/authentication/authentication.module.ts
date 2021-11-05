import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { LibAuthenticationModule } from 'projects/library/src/app/presentation/authentication/authentication.module'
import { forkJoin, from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { AuthenticationRoutingModule } from './authentication-routing.module'
import { AuthenticationComponent } from './authentication.component'

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    LibAuthenticationModule,
  ],
})
export class AuthenticationModule {}
