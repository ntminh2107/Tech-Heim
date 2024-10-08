import {
  addBillToUserAPI,
  addNotificationAPI,
  addOrderAPI,
  fetchNotificationAPI,
  getDetailOrderAPI,
  getOrderAPI,
  getUserAPI,
  paidOrderAPI,
} from "../../services/order.service";
import { Notification, Order } from "../../types/Order";
import { User } from "../../types/User";
import { createAppSlice } from "../appSlice";

interface OrderState {
  orders: Order[];
  detailOrder: Order | null;
  user: User | undefined;
  notification: Notification | null;
}

const initialState: OrderState = {
  orders: [],
  detailOrder: null,
  user: undefined,
  notification: null,
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
      async ({
        id,
        currentOrder,
      }: {
        id: string | number;
        currentOrder: Order;
      }) => {
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
    getUserDetailThunk: create.asyncThunk(
      async (id: string | number) => {
        const res = await getUserAPI(id);
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
            user: data,
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
    addBillToUserThunk: create.asyncThunk(
      async ({ id, user }: { id: string | number; user: User }) => {
        const res = await addBillToUserAPI({ id, user });
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
            user: data,
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
    addNotificationThunk: create.asyncThunk(
      async (data: Notification) => {
        const res = await addNotificationAPI(data);
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
            notification: data,
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
    fetchNotificationThunk: create.asyncThunk(
      async (id: string) => {
        const res = await fetchNotificationAPI(id);
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
            notification: data,
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
  }),
});

export const {
  getOrderThunk,
  getOrderDetailThunk,
  addOrderThunk,
  paidOrderThunk,
  getUserDetailThunk,
  addBillToUserThunk,
  addNotificationThunk,
  fetchNotificationThunk,
} = orderSlice.actions;

export default orderSlice.reducer;
