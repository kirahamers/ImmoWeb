import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

const AppLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default AppLayout;