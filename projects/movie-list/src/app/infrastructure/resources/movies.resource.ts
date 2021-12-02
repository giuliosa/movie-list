import { CompanyResource } from './company.resource'
import { CountryResource } from './country.resource'
import { GenreResource } from './genre.resource'
import { SpokenLanguagesResource } from './spoken-languages.resource'

export class MovieResource {
  id: number

  adult: boolean

  backdrop_path: string // eslint-disable-line

  belongs_to_collection: any // eslint-disable-line

  budget: number

  genres: GenreResource[]

  homepage: string

  imdb_id: string // eslint-disable-line

  original_language: string // eslint-disable-line

  original_title: string // eslint-disable-line

  overview: string

  popularity: number

  poster_path: string // eslint-disable-line

  production_companies: CompanyResource[] // eslint-disable-line

  production_countries: CountryResource[] // eslint-disable-line

  release_date: Date // eslint-disable-line

  revenue: number

  runtime: number

  spoken_languages: SpokenLanguagesResource[] // eslint-disable-line

  status: string

  tagline: string

  title: string

  video: boolean

  vote_average: number // eslint-disable-line

  vote_count: number // eslint-disable-line
}
