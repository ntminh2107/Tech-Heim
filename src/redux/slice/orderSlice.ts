import { PayloadAction } from '@reduxjs/toolkit'
import {
  addOrderAPI,
  addtransactionAPI,
  getAllOrderAPI,
  getDetailOrderAPI,
  getListMethodAPI
} from '../../services/order.service'
import {
  Order,
  OrderWithIDStripe,
  ShipMethod,
  Transaction
} from '../../types/Order'

import { createAppSlice } from '../appSlice'

interface OrderState {
  loading: boolean
  order: OrderWithIDStripe | null
  transaction: Transaction | null
  shipCost: ShipMethod | null
  shipCostList: ShipMethod[]
  orderList: Order[]
}

const initialState: OrderState = {
  loading: true,
  order: null,
  transaction: null,
  shipCost: null,
  shipCostList: [],
  orderList: []
}

export const orderSlice = createAppSlice({
  name: 'order',
  initialState,
  reducers: (create) => ({
    chooseShipCostAction: create.reducer(
      (state, action: PayloadAction<ShipMethod>) => {
        const data = action.payload
        return {
          ...state,
          shipCost: data
        }
      }
    ),
    addOrderThunk: create.asyncThunk(
      async ({
        addressID,
        shipMethodID
      }: {
        addressID: number
        shipMethodID: number
      }) => {
        const res = await addOrderAPI({ addressID, shipMethodID })
        return res
      },
      {
        pending: (state) => {
          return {
            ...state,
            loading: false
          }
        },
        fulfilled: (state, action) => {
          const { data, status } = action.payload
          return {
            ...state,
            loading: false,
            order: data,
            status: status
          }
        },
        rejected: (state) => {
          return {
            ...state,
            loading: false
          }
        }
      }
    ),
    getOrderDetailThunk: create.asyncThunk(
      async (orderID: string) => {
        const res = getDetailOrderAPI(orderID)
        return res
      },
      {
        pending: (state) => {
          return {
            ...state,
            loading: true
          }
        },
        fulfilled: (state, action) => {
          const { data, status } = action.payload
          return {
            ...state,
            order: data,
            loading: false,
            status: status
          }
        },
        rejected: (state) => {
          return {
            ...state,
            loading: false
          }
        }
      }
    ),
    addTransactionThunk: create.asyncThunk(
      async ({
        orderID,
        stripePaymentIntentID
      }: {
        orderID: string
        stripePaymentIntentID: string
      }) => {
        const res = await addtransactionAPI({ orderID, stripePaymentIntentID })
        return res
      },
      {
        pending: (state) => {
          return {
            ...state,
            loading: true
          }
        },
        fulfilled: (state, action) => {
          const { data, status } = action.payload
          return {
            ...state,
            loading: false,
            transaction: data,
            status: status
          }
        },
        rejected: (state) => {
          return {
            ...state,
            loading: false
          }
        }
      }
    ),
    getListMethodShipThunk: create.asyncThunk(getListMethodAPI, {
      pending: (state) => {
        return {
          ...state,
          loading: true
        }
      },
      fulfilled: (state, action) => {
        const { data, status } = action.payload
        return {
          ...state,
          shipCostList: data,
          status: status,
          loading: false
        }
      },
      rejected: (state) => {
        return {
          ...state,
          loading: false
        }
      }
    }),
    getAllOrderThunk: create.asyncThunk(getAllOrderAPI, {
      pending: (state) => {
        return {
          ...state,
          loading: true
        }
      },
      fulfilled: (state, action) => {
        const { data, status } = action.payload
        return {
          ...state,
          status: status,
          orderList: data,
          loading: false
        }
      },
      rejected: (state) => {
        return {
          ...state,
          loading: false
        }
      }
    })
  })
})

export const {
  addOrderThunk,
  getOrderDetailThunk,
  addTransactionThunk,
  chooseShipCostAction,
  getListMethodShipThunk,
  getAllOrderThunk
} = orderSlice.actions

export default orderSlice.reducer
