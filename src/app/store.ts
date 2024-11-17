import { configureStore } from "@reduxjs/toolkit";
import {contactReducer} from "../containers/slices/sliceContact/sliceContact.tsx";

export const store = configureStore({
  reducer: {
    phonebook: contactReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
