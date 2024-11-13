import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const verifyEmail = createAsyncThunk('auth/verifyEmail', async ({ uid, token }) => {
    const response = await axios.get(`/api/verify-email/${uid}/${token}/`);
    return response.data;
});

export const resendVerificationEmail = createAsyncThunk(
    'auth/resendVerificationEmail',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/resend-verification-email/');
            return response.data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
const authSlice = createSlice({
    name: 'auth',
    initialState: { isVerified: false, loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(verifyEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyEmail.fulfilled, (state) => {
                state.isVerified = true;
                state.loading = false;
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(resendVerificationEmail.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(resendVerificationEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.resendMessage = action.payload;
            })
            .addCase(resendVerificationEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;
