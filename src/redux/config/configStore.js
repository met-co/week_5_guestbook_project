// src/redux/modules/config/configStore.js

import { configureStore } from "@reduxjs/toolkit";

import guestbooks from "../modules/guestBooksSlice";
import guestbook from "../modules/guestBookSlice";
import comments from "../modules/commentsSlice";
import Comment from "../modules/commentSlice";

const store = configureStore({
  reducer: { guestbooks, guestbook, comments, Comment },
});

export default store;
