import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const __getGuestbookThunk = createAsyncThunk(
  "GET_GUESTBOOK",
  async (payload, thunkAPI) => {
    try {
      //`http://localhost:3001/guestbooks`
      //const { data } = await axios.get(`${serverurl}/guestbooks/${payload}`);
      const { data } = await axios.get(
        `http://localhost:3001/guestBooks/${payload}`
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const __updateGuestbookThunk = createAsyncThunk(
  "UPDATE_GUESTBOOK",
  async (payload, thunkAPI) => {
    try {
      // axios.patch(`${serverurl}/guestbooks/${payload.id}`, payload);
      axios.patch(`http://localhost:3001/guestBooks/${payload.id}`, payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

const initialState = {
  guestbook: {
    id: 0,
    content: "",
    username: "",
    title: "",
  },
  error: null,
  isLoading: false,
};

export const guestBookSlice = createSlice({
  name: "guestbook",
  initialState,
  reducers: {
    clearGuestbook: (state) => {
      state.guestbook = {
        id: 0,
        content: "",
        username: "",
        title: "",
      };
    },
  },
  extraReducers: {
    [__getGuestbookThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.guestbook = action.payload;
    },
    [__getGuestbookThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getGuestbookThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateGuestbookThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.guestbook = action.payload;
    },
    [__updateGuestbookThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateGuestbookThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { clearGuestbook } = guestBookSlice.actions;
export default guestBookSlice.reducer;
