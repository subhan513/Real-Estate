import {createSlice} from "@reduxjs/toolkit";

const initialState = { 
  currentUser: null,
  error: null,
  loading: false
};

const userSlice = createSlice({
  name: "user",
  initialState, 
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
    },
    deleteStart : (state,action) =>{
      state.loading = true
    },
    deleteSuccess :(state,action) =>{
      state.currentUser = null
      state.loading = false
      state.error = null
    },
    deleteFailure : (state,action) =>{
       state.error = action.payload
       state.loading = false
    } ,
    SignoutStart : (state,action) =>{
      state.loading = true
    },
    SignoutSuccess :(state,action) =>{
      state.currentUser = null
      state.loading = false
      state.error = null
    },
    SignoutFailure : (state,action) =>{
       state.error = action.payload
       state.loading = false
    } 
  }
});
export const {signInStart, signInSuccess, signInFailure,deleteFailure,deleteStart,deleteSuccess,SignoutFailure,SignoutSuccess, SignoutStart} = userSlice.actions;
export default userSlice.reducer;