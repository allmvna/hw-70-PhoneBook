import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Contact {
    name: string;
    phone: string;
    email: string;
    photo: string;
}

interface ContactState {
    isModalOpen: boolean;
    selectedContact: Contact | null;
}

const initialState: ContactState = {
    isModalOpen: false,
    selectedContact: null,
};

export const sliceModal = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setSelectedContact(state, action: PayloadAction<Contact | null>) {
            state.selectedContact = action.payload;
        },
        toggleModal(state, action: PayloadAction<boolean>) {
            state.isModalOpen = action.payload;
        },
    },
});

export const { setSelectedContact, toggleModal } = sliceModal.actions;
export const modalReducer = sliceModal.reducer;