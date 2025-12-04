import {createSlice} from "@reduxjs/toolkit";

const initialState = {  // Fixed: "initialState" not "intialState"
  currentUser: null,
  error: null,
  loading: false  // Changed from null to false (better default)
};

const userSlice = createSlice({
  name: "user",
  initialState,  // Fixed: should match the variable name
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => { 
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    } 
  }
});

// Fixed: Changed SignInSuccess to signInSuccess (lowercase 's')
export const {signInStart, signInSuccess, signInFailure} = userSlice.actions;
export default userSlice.reducer;