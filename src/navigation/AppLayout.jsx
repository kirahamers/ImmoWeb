import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

const AppLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default AppLayout;