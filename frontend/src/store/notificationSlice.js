import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    // Tracks new unread notifications
    unreadCount: 0, 
  },
  reducers: {
    addNotification: (state) => {
      // Increment notification count
      state.unreadCount += 1; 
    },
    clearNotifications: (state) => {
      // Reset notification count
      state.unreadCount = 0; 
    },
  },
});

export const { addNotification, clearNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;

