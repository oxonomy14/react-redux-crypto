import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchContacts,
  deleteContact,
  addContact,
  editContact,
} from "./operations";
import { logOut } from "../auth/operations";

const initialState = {
  contacts: {
    items: [],
    loading: false,
    error: null,
    success: null,
    isEdit: false,
    currentContact: null,
    isOpenModal: false,
    isDelete: false,
  },
};

const slice = createSlice({
  name: "contactList",
  initialState,

  reducers: {
    resetSuccess(state, action) {
      state.contacts.success = action.payload;
    },
    setIsOpenModal: (state, action) => {
      state.contacts.isOpenModal = action.payload;
    },

    setIsDelete: (state, action) => {
      state.contacts.isDelete = action.payload;
    },

    setIsEdit: (state, action) => {
      state.contacts.isEdit = action.payload;
    },
    setCurrentContact: (state, action) => {
      state.contacts.currentContact = action.payload;
      console.log("CurrentContact:", state.contacts.currentContact);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.items = action.payload;
      })

      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.items = state.contacts.items.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(logOut.fulfilled, () => initialState)
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.items.push(action.payload);
      })
      .addCase(editContact.fulfilled, (state, action) => {
        state.contacts.items = state.contacts.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })

      .addMatcher(
        isAnyOf(
          addContact.rejected,
          deleteContact.rejected,
          fetchContacts.rejected
        ),
        (state, action) => {
          state.contacts.error = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          addContact.pending,
          deleteContact.pending,
          fetchContacts.pending
        ),
        (state, action) => {
          state.contacts.error = null;
          state.contacts.loading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          addContact.fulfilled,
          deleteContact.fulfilled,
          fetchContacts.fulfilled
        ),
        (state, action) => {
          state.contacts.loading = false;
        }
      )
      .addMatcher(
        isAnyOf(addContact.fulfilled, deleteContact.fulfilled),
        (state, action) => {
          state.contacts.success = true;
        }
      );
  },
});

export const contactsReducer = slice.reducer;
export const {
  setIsEdit,
  setCurrentContact,
  setIsOpenModal,
  setIsDelete,
  resetSuccess,
} = slice.actions;
