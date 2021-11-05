import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { LibAuthenticationComponent } from './authentication.component'

@NgModule({
  declarations: [LibAuthenticationComponent],
  imports: [CommonModule],
  exports: [LibAuthenticationComponent],
})
export class LibAuthenticationModule {}
