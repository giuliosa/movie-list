import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { MoviesRepository } from "./movies.repository"

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [MoviesRepository]
})
export class MoviesRepositoryModule {}
