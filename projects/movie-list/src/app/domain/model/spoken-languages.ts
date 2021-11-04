import { SpokenLanguagesResource } from "../../infrastructure/resources/spoken-languages.resource"

export class SpokenLanguages {
  englishName: string
  iso6391: string
  name: string

  constructor(resource?: SpokenLanguagesResource) {
    if(resource) {
      this.englishName = resource.english_name
      this.iso6391 = resource.iso_639_1
      this.name = resource.name
    }
  }
}
