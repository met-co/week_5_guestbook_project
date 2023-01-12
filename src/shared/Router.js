import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AddGuestBook from "../pages/AddGuestBook";
import GuestBooks from "../pages/GuestBooks";
import GuestBook from "../pages/GuestBook";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guestbook/add" element={<AddGuestBook />} />
        <Route path="/guestbooks" element={<GuestBooks />} />
        <Route path="/guestbooks/:id" element={<GuestBook />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
