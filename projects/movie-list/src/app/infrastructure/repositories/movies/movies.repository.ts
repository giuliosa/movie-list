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

  retrieveNowPlaying(): Observable<IQueryResult<Array<any>>> {
    return this.remoteGateway.get(`movie/now_playing`).pipe(
      map((resources: Array<any>) => resources.map(r => new Object(r))),
      asQueryResult(),
    )
  }

  retrieveMoviesById(id: string): Observable<IQueryResult<any>> {
    return this.remoteGateway.get(`movie/${id}`).pipe(
      map((resource: MovieResource) => new Movie(resource)),
      asQueryResult(),
    )
  }
}
