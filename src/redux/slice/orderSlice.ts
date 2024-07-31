import {
  addOrderAPI,
  getDetailOrderAPI,
  getOrderAPI,
  paidOrderAPI,
} from "../../services/order.service";
import { Order } from "../../types/Order";
import { createAppSlice } from "../appSlice";

interface OrderState {
  orders: Order[];
  detailOrder: Order | null;
}

const initialState: OrderState = {
  orders: [],
  detailOrder: null,
};

export const orderSlice = createAppSlice({
  name: "order",
  initialState,
  reducers: (create) => ({
    getOrderThunk: create.asyncThunk(getOrderAPI, {
      pending: (state) => {
        return {
          ...state,
          loading: true,
        };
      },
      fulfilled: (state, action) => {
        const { data, status } = action.payload;
        return {
          ...state,
          loading: false,
          orders: data,
          status: status,
        };
      },
      rejected: (state) => {
        return {
          ...state,
          loading: false,
        };
      },
    }),
    getOrderDetailThunk: create.asyncThunk(
      async (id: string) => {
        const res = await getDetailOrderAPI(id);
        return res;
      },
      {
        pending: (state) => {
          return {
            ...state,
            loading: true,
          };
        },
        fulfilled: (state, action) => {
          const { data, status } = action.payload;
          return {
            ...state,
            loading: false,
            detailOrder: data,
            status: status,
          };
        },
        rejected: (state) => {
          return {
            ...state,
            loading: true,
          };
        },
      }
    ),
    addOrderThunk: create.asyncThunk(
      async (data: Order) => {
        const res = await addOrderAPI(data);
        return res;
      },
      {
        pending: (state) => {
          return {
            ...state,
            loading: true,
          };
        },
        fulfilled: (state, action) => {
          const { data, status } = action.payload;
          return {
            ...state,
            loading: false,
            orders: data,
            status: status,
          };
        },
        rejected: (state) => {
          return {
            ...state,
            loading: false,
          };
        },
      }
    ),
    paidOrderThunk: create.asyncThunk(
      async ({ id, currentOrder }: { id: string; currentOrder: Order }) => {
        const res = await paidOrderAPI({ id, currentOrder });
        return res;
      },
      {
        pending: (state) => {
          return {
            ...state,
            loading: true,
          };
        },
        fulfilled: (state, action) => {
          const { data, status } = action.payload;
          return {
            ...state,
            loading: false,
            detailOrder: data,
            status: status,
          };
        },
        rejected: (state) => {
          return {
            ...state,
            loading: false,
          };
        },
      }
    ),
    // updateUserBillThunk: create.asyncThunk(
    //   async ({ userId, bill }: { userId: number | string; bill: Bill }) => {
    //     const res = await updateUserBillAPI(userId, bill);
    //     return res;
    //   },
    //   {
    //     pending: (state) => {
    //       return {
    //         ...state,
    //         loading: false,
    //       };
    //     },
    //     fulfilled: (state, action) => {
    //       const { data, status } = action.payload;
    //       return {
    //         ...state,
    //         status: status,
    //         detailOrder: data,
    //         loading: false,
    //       };
    //     },
    //     rejected: (state) => {
    //       return {
    //         ...state,
    //         loading: false,
    //       };
    //     },
    //   }
    // ),
  }),
});

export const {
  getOrderThunk,
  getOrderDetailThunk,
  addOrderThunk,
  paidOrderThunk,
} = orderSlice.actions;

export default orderSlice.reducer;
