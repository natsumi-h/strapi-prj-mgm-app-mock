import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NEXT_URL } from "../config";
import { useRouter } from "next/router";
import { useEffect } from "react";

// https://reffect.co.jp/react/redux-toolkit#i
// https://qiita.com/ozaki25/items/1375336826a021370528

const initialState = {
  user: null,
  error: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const logout = () => {
  // const router = useRouter();
  return async (dispatch) => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });
    if (res.ok) {
      dispatch(setUser(null));
      dispatch(setToken(null));
      // router.push("/");
    } else {
      dispatch(setError(data.message));
      dispatch(setError(null));
    }
  };
};

//Login user
export const login = ({ email: identifier, password }) => {
  return async (dispatch) => {
    // console.log({ identifier, password });
    // const router = useRouter();
    try {
      const res = await fetch(`${NEXT_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });
      const data = await res.json();
      console.log(res.status);
      if (res.ok) {
        dispatch(setUser(data.user));
        dispatch(setToken(data.jwt));
        dispatch(setError(null));
        // router.push("/");
      } else {
        // console.log({ message: data.message });
        dispatch(setError(data.message));
        // dispatch(setError(null));
      }
    } catch (error) {
      dispatch(setError("Something wrong. Please try again."));
    }
  };
};

export const register = (user) => {
  return async (dispatch) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(setUser(data.user));
      dispatch(setToken(data.jwt));
      dispatch(setError(null));
      console.log(data);
      // router.push("/");
    } else {
      // console.log({ message: data.message });
      dispatch(setError(data.message));
      // dispatch(setError(null));
    }
  };
};

//DOMになる瞬間（マウントされる瞬間）に、checkUserLoggedInの処理が走る
// useEffect(() => {
//   checkUserLoggedIn();
// }, []);

// Check if user is logged in
//resがOKならuserにuserデータを渡す
// マウント時に実行する関数
// export const checkUserLoggedIn = () => async (dispatch) => {
//   const res = await fetch(`${NEXT_URL}/api/user`);
//   const data = await res.json();
//   if (res.ok) {
//     dispatch(setUser(data.user));
//   } else {
//     dispatch(setUser(null));
//     // router.push("/account/login");
//   }
// };

export const { setUser, setError, setToken } = authSlice.actions;

export const authReducer = authSlice.reducer;
