import axiosAPI from "../../../axiosAPI.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export interface IContact {
    id: string;
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

interface ContactsResponse {
    [id: string]: IContact;
}

export const addContact = createAsyncThunk('contact/addContact', async (contact: IContact) => {
    const { data } = await axiosAPI.post('/contacts.json', contact);
    return { ...contact, id: data.name };
});

export const fetchContact = createAsyncThunk('contact/fetchContact', async () => {
    const { data } = await axiosAPI.get<ContactsResponse>('contacts.json');

    return Object.entries(data).map(([key, value]) => ({
        ...value,
        id: key,
    }));
});

export const deleteContact = createAsyncThunk('contact/deleteContact', async (id: string) => {
    await axiosAPI.delete(`/contacts/${id}.json`);
    return id;
});

export const updateContact = createAsyncThunk('contact/updateContact', async (contact: IContact) => {
    await axiosAPI.put(`/contacts/${contact.id}.json`, contact);
    return contact;
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
            })
            .addCase(fetchContact.pending, (state) => {
            state.isLoading = true;
            state.error = false;
            })
            .addCase(fetchContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contacts = action.payload;
            })
            .addCase(fetchContact.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(deleteContact.pending, (state) => {
            state.isLoading = true;
            state.error = false;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
            })
            .addCase(deleteContact.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(updateContact.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(updateContact.fulfilled, (state, action) => {
                state.isLoading = false;

                const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
                if (index !== -1) {
                    state.contacts[index] = action.payload;
                }
            })
            .addCase(updateContact.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    },

});

export const contactReducer = sliceContact.reducer;