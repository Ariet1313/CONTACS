import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.push(action.payload);
    },
    updateContact: (state, action) => {
      const { id, name, phone } = action.payload;
      const contact = state.find(contact => contact.id === id);
      if (contact) {
        contact.name = name;
        contact.phone = phone;
      }
    },
    removeContact: (state, action) => {
      return state.filter(contact => contact.id !== action.payload);
    }
  },
});

export const { addContact, updateContact, removeContact } = contactsSlice.actions;
export default contactsSlice.reducer;
