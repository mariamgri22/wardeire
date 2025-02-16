

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/authSlice";


 const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']


export default makeStore;
