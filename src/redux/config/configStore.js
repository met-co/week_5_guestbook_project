// src/redux/modules/config/configStore.js

import { configureStore } from "@reduxjs/toolkit";

import guestbooks from "../modules/guestBooksSlice";

const store = configureStore({
  reducer: { guestbooks },
});

export default store;
