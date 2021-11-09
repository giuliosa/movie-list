import { CountryResource } from '../../infrastructure/resources/country.resource'

export class Country {
  iso31661: string

  name: string

  constructor(resource?: CountryResource) {
    if (resource) {
      this.iso31661 = resource.iso_3166_1
      this.name = resource.name
    }
  }
}
