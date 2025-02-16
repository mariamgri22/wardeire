
import api from "@/token";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post("/login", credentials);
      const { token } = response.data;
      Cookies.set("bearerToken", token, { expires: 1 });
      return response.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  }
);
export const registerAsync = createAsyncThunk(
  "auth/register",
  async (credentials: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await api.post("/sign-up", credentials);
      const { token } = response.data;
      Cookies.set("bearerToken", token, { expires: 1 });
      return response.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  }
);
export const getUser = createAsyncThunk(
  "auth/getUser",
  async () => {
    try {
      const response = await api.get("/user");
      return response.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  }
);

interface AuthState {
  isLoggedIn: boolean;
  user: {
    username?: string;
    email: string;
  } | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  loginMethod: "register" | "login" ;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  loading: "idle",
  error: null,
  loginMethod: "register",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerSuccess: (
      state,
      action: PayloadAction<{ username: string; email: string }>
    ) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<{ email: string }>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },

    changeLoginMethod(state, action) {
      state.loginMethod = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.user = { email: action.payload.email };
        state.isLoggedIn = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message ?? null;
        state.isLoggedIn = false;
      })
      .addCase(registerAsync.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.user = {
          username: action.payload.username,
          email: action.payload.email,
        };
        state.isLoggedIn = true;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message ?? null;
        state.isLoggedIn = false;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.user = {
          username: action.payload.username,
          email: action.payload.email,
        };
        state.isLoggedIn = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message ?? null;
        state.isLoggedIn = false;
      });
  },
});

export const { loginSuccess, logout, registerSuccess, changeLoginMethod } = authSlice.actions;
export default authSlice.reducer;
