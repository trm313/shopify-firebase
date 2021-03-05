import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    authenticate(state, action) {
      if (action.payload?.uid) {
        return {
          user: action.payload,
          isLoading: false,
          isAuthenticated: true,
          error: null,
        };
      } else {
        return {
          user: null,
          isLoading: false,
          isAuthenticated: false,
          error: "Error authenticating user",
        };
      }
    },
    logout(state) {
      return {
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      };
    },
  },
});

export const { authenticate, logout } = authSlice.actions;
export default authSlice.reducer;
