import { AxiosResponse } from 'axios'

export enum Vendor {
  Lazada = 'Lazada',
  Shopee = 'Shopee'
}

export interface ShopeeModel {
  itemid: number
  modelid: number
  name: string
  status: number
  normal_stock: number
}

export interface ShopeeProduct {
  itemid: number
  shopid: number
  name: string
  models: ShopeeModel[]
}

export interface ShopeeData {
  data: ShopeeProduct
}

export interface Product {
  apiUrl: string
  pageUrl: string
  loading?: boolean
  vendor: Vendor
  data?: ShopeeData | null
}
