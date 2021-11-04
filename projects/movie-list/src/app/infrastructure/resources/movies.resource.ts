import { CompanyResource } from "./company.resource"
import { CountryResource } from "./country.resource"
import { GenreResource } from "./genre.resource"
import { SpokenLanguagesResource } from "./spoken-languages.resource"

export class MovieResource {
  id: number
  adult: boolean
  backdrop_path: string
  belongs_to_collection: any
  budget: number
  genres: GenreResource[]
  homepage: string
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  posterPath: string
  production_companies: CompanyResource[]
  production_countries: CountryResource[]
  release_date: Date
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguagesResource[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}
