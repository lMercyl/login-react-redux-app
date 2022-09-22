import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserSliceState } from './types';

const initialState: UserSliceState = {
  email: "",
  token: "",
  id: ""
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state: UserSliceState, action: PayloadAction<UserSliceState>) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser(state: UserSliceState) {
      state.email = "";
      state.token = "";
      state.id = "";
    },
  }, 
})

export const { setUser, removeUser } = UserSlice.actions;

export default UserSlice.reducer;