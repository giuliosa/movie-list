import { PageResource } from '../../infrastructure/resources/page.resource'

export class Page<T> {
  public static fromPageResource<R, S>(
    pageResource: PageResource<R>,
    transform: (r: R) => S,
  ): Page<S> {
    const page = new Page<S>()

    page.pageSize = pageResource.results.length
    page.totalItemsCount = pageResource.total_results
    page.totalPagesCount = pageResource.total_pages
    page.currentPage = pageResource.page

    page.data = pageResource.results.map(transform)

    return page
  }

  constructor(
    public data: Array<T> = [],
    public totalItemsCount: number = 0,
    public currentPage: number = 0,
    public pageSize: number = 1,
    public totalPagesCount: number = 1,
  ) {}
}
