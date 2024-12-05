import { Address } from './User'

export type OrderItems = {
  name: string
  image: string
  quantity: number
  price: number
}

export type Order = {
  id: string
  userID: string
  address: Address
  status: string
  shipMethod: ShipMethod
  orderItems: OrderItems[]
  total: number
  transaction?: Transaction
  createdAt: Date
  updatedAt: Date
  stripeID?: string
  stripeClientSecret?: string
}

export type OrderWithIDStripe = {
  orderDetail: Order
  stripeID?: string
  stripeClientSecret?: string
}

export type ShipMethod = {
  id: number
  method: string
  detail: string
  price: number
}

export type Transaction = {
  id: string
  orderID: string
  userID: string
  stripePaymentIntentID: string
  stripeStatus: string
  amount: number
  currency: string
  receiptURL: string
  createdAt: Date
}
