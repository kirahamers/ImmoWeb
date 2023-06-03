import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default AppLayout;