export interface IDelivery {
  order_code: string
  sort_code: string
  trans_type: string
  ward_encode: string
  district_encode: string
  fee: IFee
  total_fee: number
  expected_delivery_time: string
}

export interface IFee {
  main_service: number
  insurance: number
  cod_fee: number
  station_do: number
  station_pu: number
  return: number
  r2s: number
  return_again: number
  coupon: number
  document_return: number
  double_check: number
  double_check_deliver: number
  pick_remote_areas_fee: number
  deliver_remote_areas_fee: number
  pick_remote_areas_fee_return: number
  deliver_remote_areas_fee_return: number
  cod_failed_fee: number
}

export interface IShippedFood {
  name: string,
  quantity: number,
  height: number,
  weight?: number,
  length: number,
  width: number
}

export interface ICreateShippingOrder {
  fromWardCode: string,
  toWardCode: string,
  toDistrictId: number,
  items: IShippedFood[]
}