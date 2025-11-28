import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, registerAPI } from "../api/authApi";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await loginAPI({ email, password });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await registerAPI(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
