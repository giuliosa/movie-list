export interface PageResource<T> {
  content: Array<T>
  nextLink: string
  previousLink: string
  pageMetadata: PageMetadataResource
}

export interface PageMetadataResource {
  size: number
  number: number
  totalElements: number
  totalPages: number
}
