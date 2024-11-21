import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    unreadCount: 0, // Tracks new unread notifications
  },
  reducers: {
    addNotification: (state) => {
      state.unreadCount += 1; // Increment notification count
    },
    clearNotifications: (state) => {
      state.unreadCount = 0; // Reset notification count
    },
  },
});

export const { addNotification, clearNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
