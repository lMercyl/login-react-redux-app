import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ContactsSliceState } from "./types";

export const fetchContacts = createAsyncThunk<ContactsSliceState>('contacts/fetchContacts', async () => {
  try {
    const { data } = await axios.get(`https://61a54a844c822c0017042179.mockapi.io/contacts`);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
});