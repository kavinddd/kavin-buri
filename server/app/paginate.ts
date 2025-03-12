// @deprecated: use ModelAttribtes, a built-in data type from lucid
// // used to transform lucid model to native type
// export type ModelType<
//   T extends abstract new (...args: any) => any,
//   K extends keyof InstanceType<T>,
// > = Pick<InstanceType<T>, K>

// used to create a request for data pagination

export type SortDirectionType = 'asc' | 'desc'

export const DEFAULT_PAGINATE_REQ: PaginateReq<unknown, unknown> = {
  size: 10,
  page: 1,
  direction: 'asc',
}
export type PaginateReq<SearchType, SortType> = {
  search?: SearchType
  sort?: SortType
  size?: number
  page?: number
  direction?: SortDirectionType
}

export type Paginated<DataType> = {
  data: DataType[]
  total: number
  hasNext: boolean
}
