import { createSlice } from "@reduxjs/toolkit";

// Initialize initialState as an object
const initialState = {
  user: null, // or any other default value for user
};

const userSlice = createSlice({
  name: "user",
  initialState, // Use the initialState object
  reducers: {
    addUser: (state, action) => {
      return { ...state, user: action.payload }; // Update the user property
    },
    removeUser: (state, action) => {
      return { ...state, user: null }; // Reset user to null
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
