import { configureStore } from "@reduxjs/toolkit";
import {contactReducer} from "../containers/slices/sliceContact/sliceContact.tsx";
import {modalReducer} from "../containers/slices/sliceModal/sliceModal.tsx";

export const store = configureStore({
  reducer: {
    phonebook: contactReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
