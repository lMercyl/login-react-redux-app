import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchContacts } from './asyncAction';
import { ContactsSliceState, Item } from './types';

const initialState: ContactsSliceState = {
  list: []
};

const ContactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setList(state: ContactsSliceState, action: PayloadAction<Array<Item>>) {
      state.list = action.payload;
    },
    removeItem(state: ContactsSliceState, action: PayloadAction<string>) {
      state.list = state.list.filter((item: Item) => item.id !== action.payload);
    },
    editItem(state: ContactsSliceState, action: PayloadAction<Item>) {
      state.list = state.list.map((item: Item) => action.payload.id === item.id ? { ...item, name: action.payload.name, phone: action.payload.phone } : item);
    }
  }, 
  extraReducers: (builder: any) => {
    builder.addCase(fetchContacts.pending, (state: ContactsSliceState, action: PayloadAction) => {
      state.list = [];
    });
    builder.addCase(fetchContacts.fulfilled, (state: ContactsSliceState, action: PayloadAction<Array<Item>>) => {
      state.list = action.payload;
    });
    builder.addCase(fetchContacts.rejected, (state: ContactsSliceState, action: PayloadAction) => {
      state.list = [];
    });
  }, 
})

export const { setList, removeItem, editItem } = ContactsSlice.actions;

export default ContactsSlice.reducer;