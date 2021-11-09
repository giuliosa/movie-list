import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { LibAuthenticationModule } from 'projects/library/src/app/presentation/authentication/authentication.module'

import { AuthenticationRoutingModule } from './authentication-routing.module'
import { AuthenticationComponent } from './authentication.component'

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [CommonModule, AuthenticationRoutingModule, LibAuthenticationModule],
})
export class AuthenticationModule {}
