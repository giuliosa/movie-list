import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MoviesRepository } from "../../../infrastructure/repositories/movies/movies.repository";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(
    private movieRepository: MoviesRepository,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    console.log('Entrou no home')
    this.movieRepository.retrieveMoviesById('580489').subscribe(movie => {
      console.log(movie)
    })

  }
}
