import { configureStore } from "@reduxjs/toolkit";
import user from "./user/slice";
import contacts from "./contacts/slice";

export const store = configureStore({
  reducer: {
    user,
    contacts
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
