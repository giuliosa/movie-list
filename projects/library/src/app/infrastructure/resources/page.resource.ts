export interface PageResource<T> {
  results: Array<T>
  nextLink: string
  previousLink: string
  page: number
  // eslint-disable-next-line @typescript-eslint/naming-convention
  total_pages: number
  // eslint-disable-next-line @typescript-eslint/naming-convention
  total_results: number
}
