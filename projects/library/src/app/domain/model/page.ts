import { PageResource } from '../../infrastructure/resources/page.resource'

export class Page<T> {
  public static fromPageResource<R, S>(
    pageResource: PageResource<R>,
    transform: (r: R) => S,
  ): Page<S> {
    const page = new Page<S>()

    page.pageSize = pageResource.pageMetadata?.size
    page.totalItemsCount = pageResource.pageMetadata?.totalElements
    page.totalPagesCount = pageResource.pageMetadata?.totalPages
    page.currentPage = pageResource.pageMetadata?.number

    page.data = pageResource.content.map(transform)

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
