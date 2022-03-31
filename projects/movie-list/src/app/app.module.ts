import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { RemoteGatewayModule } from 'projects/library/src/app/infrastructure/gateways/remote-gateway/remote-gateway.module'

import { environment } from '../environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { SidebarModule } from './presentation/components/sidebar/sidebar.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SidebarModule,
    RemoteGatewayModule.forRoot(environment.remoteGatewayConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
