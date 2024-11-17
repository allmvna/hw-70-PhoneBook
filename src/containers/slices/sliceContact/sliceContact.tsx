import axiosAPI from "../../../axiosAPI.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export interface IContact {
    name: string;
    phone: string;
    email: string;
    photo: string;
}

interface ContactState {
    contacts: IContact[];
    isLoading: boolean;
    error: boolean;
}


const initialState : ContactState = {
   contacts: [],
    isLoading: false,
    error: false,
};

export const addContact = createAsyncThunk('contact/addContact', async (contact: IContact) => {
    const { data } = await axiosAPI.post('/contacts.json', contact);
    return { id: data.name, ...contact };
});


export const sliceContact = createSlice({
    name: 'contact',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addContact.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contacts.push(action.payload);
            })
            .addCase(addContact.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    },

});

export const contactReducer = sliceContact.reducer;