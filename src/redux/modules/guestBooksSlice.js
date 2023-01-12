// src/redux/modules/counterSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

///////// 게시글 추가 thunk,POST ///////////////////
export const __addGuestbookThunk = createAsyncThunk(
  "ADD_GUESTBOOK",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3001/guestBooks`,
        payload
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

///////// 게시글 조회 thunk,GET ///////////////////
export const __getGuestbookThunk = createAsyncThunk(
  "GET_GUESTBOOK",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/guestBooks`);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

///////// 게시글 삭제 thunk,DELETE ///////////////////
export const __deleteGuestbookThunk = createAsyncThunk(
  "DELETE_GUESTBOOK",
  async (payload, thunkAPI) => {
    try {
      axios.delete(`http://localhost:3001/guestBooks/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

///////////// initialState //////////////////////////
const initialState = {
  guestbooks: [],
  error: null,
  isLoading: false,
  isSuccess: false,
};

/////////////// slice /////////////
export const guestBooksSlice = createSlice({
  name: "guestbooks",
  initialState,
  reducers: {
    clearGuestbook: (state, action) => {
      state.isSuccess = false;
    },
  },
  extraReducers: {
    [__getGuestbookThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [__getGuestbookThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.guestbooks = action.payload;
    },
    [__getGuestbookThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__addGuestbookThunk.pending]: (state) => {
      state.isSuccess = false;
      state.isLoading = true;
    },
    [__addGuestbookThunk.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.guestbooks.push(action.payload);
    },
    [__addGuestbookThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__deleteGuestbookThunk.fulfilled]: (state, action) => {
      const target = state.guestbooks.findIndex(
        (comment) => comment.id === action.payload
      );
      state.guestbooks.splice(target, 1);
    },
    [__deleteGuestbookThunk.rejected]: () => {},
    [__deleteGuestbookThunk.pending]: () => {},
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const { clearGuestbook } = guestBooksSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default guestBooksSlice.reducer;