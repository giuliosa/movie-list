import { MovieResource } from '../../infrastructure/resources/movies.resource'
import { Company } from './company'
import { Country } from './country'
import { Genre } from './genre'
import { SpokenLanguages } from './spoken-languages'

export class Movie {
  id: number

  adult: boolean

  backdropPath: string

  belongsToCollection: any

  budget: number

  genres: Genre[]

  homepage: string

  imdbId: string

  originalLanguage: string

  originalTitle: string

  overview: string

  popularity: number

  posterPath: string

  productionCompanies: Array<Company>

  productionCountries: Array<Country>

  releaseDate: Date

  revenue: number

  runtime: number

  spokenLanguages: Array<SpokenLanguages>

  status: string

  tagline: string

  title: string

  video: boolean

  voteAverage: number

  voteCount: number

  constructor(resource?: MovieResource) {
    if (resource) {
      this.id = resource.id
      this.adult = resource.adult
      this.backdropPath = resource.backdrop_path
      this.belongsToCollection = resource.belongs_to_collection
      this.budget = resource.budget
      this.genres = resource.genres
      this.homepage = resource.homepage
      this.imdbId = resource.imdb_id
      this.originalLanguage = resource.original_language
      this.originalTitle = resource.original_title
      this.overview = resource.overview
      this.popularity = resource.popularity
      this.posterPath = resource.poster_path
      this.productionCompanies = resource.production_companies
        ? resource.production_companies.map(item => new Company(item))
        : []
      this.productionCountries = resource.production_countries
        ? resource.production_countries.map(item => new Country(item))
        : []
      this.releaseDate = resource.release_date
      this.revenue = resource.revenue
      this.runtime = resource.runtime
      this.spokenLanguages = resource.spoken_languages
        ? resource.spoken_languages.map(item => new SpokenLanguages(item))
        : []
      this.status = resource.status
      this.tagline = resource.tagline
      this.title = resource.title
      this.video = resource.video
      this.voteAverage = resource.vote_average
      this.voteCount = resource.vote_count
    }
  }
}
