import { createAppSlice } from "../appSlice";

import { setModalState } from "./modalSlice";
import {
  addCreditCardAPI,
  addPaymentCardAPI,
  editAddressUserAPI,
  editFullnameUserAPI,
  editPaymentCardAPI,
  getCreditCardAPI,
  getCurrentUserAPI,
  getPaymentCardAPI,
  signUp,
} from "../../services/auth.service";
import { CreditCard, PaymentCard, User } from "../../types/User";
import { SignUpBody } from "../../types/RequestBody";

interface AuthState {
  isLoggedIn: boolean;
  currentUser: User | undefined;
  creditCard: CreditCard[];
  selectedCreditCard: CreditCard | undefined;
  PersonalData: User | undefined;
  paymentCard: PaymentCard | undefined;
  loading: boolean;
  status: number;
}

const initialState: AuthState = {
  isLoggedIn: false,
  currentUser: undefined,
  creditCard: [],
  selectedCreditCard: undefined,
  PersonalData: undefined,
  paymentCard: undefined,
  loading: false,
  status: 0,
};

export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: (create) => ({
    logoutAction: create.reducer(() => {
      localStorage.removeItem("token");
      return initialState;
    }),
    SignUpThunk: create.asyncThunk(
      async (data: SignUpBody, { dispatch }) => {
        const res = await signUp(data);
        if (res?.status === 201) {
          localStorage.setItem("token", res.data.id);
          dispatch(
            setModalState({
              key: "successModal",
              isOpen: true,
            })
          );
        }
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
            currentUser: data,
            status: status,
            isLoggedIn: true,
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
    getCurrentUserThunk: create.asyncThunk(
      async (id: string) => {
        const res = await getCurrentUserAPI(id);
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
            currentUser: data,
            status: status,
            isLoggedIn: true,
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
    getCreditCardThunk: create.asyncThunk(getCreditCardAPI, {
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
          creditCard: data,
          status: status,
          selectedCreditCard: data.find(
            (card: CreditCard) => card.selected === true
          ),
        };
      },
      rejected: (state) => {
        return {
          ...state,
          loading: false,
        };
      },
    }),
    addCreditCardThunk: create.asyncThunk(
      async (data: Omit<CreditCard, "id" | "image" | "selected">) => {
        const res = await addCreditCardAPI(data);
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
          const { data, status }: { data: CreditCard; status: number } =
            action.payload;
          return {
            ...state,
            loading: false,
            creditCard: state.creditCard.concat(data),
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
    editFullnameUserThunk: create.asyncThunk(
      async ({ id, fullName }: { id: string | number; fullName: string }) => {
        const res = await editFullnameUserAPI({ id, fullName });
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
            PersonalData: data,
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
    editAddressUserThunk: create.asyncThunk(
      async ({ id, address }: { id: string | number; address: string }) => {
        const res = await editAddressUserAPI({ id, address });
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
            PersonalData: data,
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
    addPaymentCardthunk: create.asyncThunk(
      async (data: Omit<PaymentCard, "id">) => {
        const res = await addPaymentCardAPI(data);
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
          const { data, status }: { data: PaymentCard; status: number } =
            action.payload;
          return {
            ...state,
            loading: false,
            paymentCard: data,
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
    getPaymentCardThunk: create.asyncThunk(
      async (userId: string) => {
        const res = await getPaymentCardAPI(userId);
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
            paymentCard: data,
            loading: false,
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
    editPaymentCardThunk: create.asyncThunk(
      async ({
        userId,
        paymentCard,
      }: {
        userId: string | number;
        paymentCard: PaymentCard;
      }) => {
        const res = await editPaymentCardAPI({ userId, paymentCard });
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
            paymentCard: data,
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
  logoutAction,
  SignUpThunk,
  getCurrentUserThunk,
  getCreditCardThunk,
  addCreditCardThunk,
  editFullnameUserThunk,
  editAddressUserThunk,
  addPaymentCardthunk,
  getPaymentCardThunk,
  editPaymentCardThunk,
} = authSlice.actions;
export default authSlice.reducer;
