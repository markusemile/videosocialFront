export interface FilterResponseModel {
  include_adult: boolean,
  year?: {
    key: string,
    label: string,
    data: string
  },
  query: string,
  sourceLocal: string
}
