import { CompanyResource } from '../../infrastructure/resources/company.resource'

export class Company {
  id: number

  description: string

  headquarters: string

  homepage: string

  logoPath: string

  name: string

  originCountry: string

  parentCompany: any

  constructor(resource?: CompanyResource) {
    if (resource) {
      this.id = resource.id
      this.description = resource.description
      this.headquarters = resource.headquarters
      this.homepage = resource.homepage
      this.logoPath = resource.logo_path
      this.name = resource.name
      this.originCountry = resource.origin_country
      this.parentCompany = resource.parent_company
    }
  }
}
