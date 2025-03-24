export interface Dropdown<IdType> {
  label: string
  id: IdType
}

export interface ListDropdown<IdType> {
  data: Dropdown<IdType>[]
}
