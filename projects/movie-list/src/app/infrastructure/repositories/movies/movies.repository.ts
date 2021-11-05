import { Injectable } from "@angular/core";
import { asQueryResult, IQueryResult } from "projects/library/src/app/commons/rx-operators/as-query-result";
import { Page } from "projects/library/src/app/domain/model/page";
import { RemoteGateway } from "projects/library/src/app/infrastructure/gateways/remote-gateway/remote.gateway";
import { PageResource } from "projects/library/src/app/infrastructure/resources/page.resource";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Movie } from "../../../domain/model/movie";
import { MovieResource } from "../../resources/movies.resource";

@Injectable()
export class MoviesRepository {
  constructor(private remoteGateway: RemoteGateway) {}

  retrieveNowPlaying(): Observable<IQueryResult<Array<Movie>>> {
    return this.remoteGateway.get(`movie/now_playing`).pipe(
      map((resources: Array<MovieResource>) => resources.map(r => new Movie(r))),
      asQueryResult(),
    )
  }

  // TODO: Verificar porque com pagina não funciona
  retrievePopularMovies(): Observable<IQueryResult<Page<Movie>>> {
    return this.remoteGateway.get(`movie/popular`).pipe(
      map((pageResource: PageResource<MovieResource>) =>
        Page.fromPageResource(pageResource, r => new Movie(r)),
      ),
      asQueryResult(),
    )
  }

  retrieveMoviesById(id: string): Observable<IQueryResult<Movie>> {
    return this.remoteGateway.get(`movie/${id}`).pipe(
      map((resource: MovieResource) => new Movie(resource)),
      asQueryResult(),
    )
  }
}
