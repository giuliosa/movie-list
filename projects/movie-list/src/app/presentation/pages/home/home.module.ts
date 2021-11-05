import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MoviesRepositoryModule } from "../../../infrastructure/repositories/movies/movies.repository.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, MoviesRepositoryModule],
  exports: [HomeComponent]
})
export class HomeModule {}
