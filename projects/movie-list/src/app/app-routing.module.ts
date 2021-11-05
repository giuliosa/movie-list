import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthenticationGuard } from "projects/library/src/app/infrastructure/guards/authentication.guard";

export enum RoutePath {
  Authentication = 'authentication',
  Home = 'home'
}

export const AppRoutes: Routes = [
  {
    path: RoutePath.Authentication,
    loadChildren: () =>
      import('./presentation/pages/authentication/authentication.module').then(
        m => m.AuthenticationModule,
      ),
  },
  {
    path: RoutePath.Home,
    loadChildren: () =>
      import('./presentation/pages/home/home.module').then(
        m => m.HomeModule,
      ),
    canActivate: [AuthenticationGuard]
  },
  {
    path: '',
    redirectTo: RoutePath.Home,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: RoutePath.Home,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
