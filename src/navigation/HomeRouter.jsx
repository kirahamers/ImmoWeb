import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import HuisDetailPage from "../pages/HuisDetailPage";
import NotFoundPage from "../pages/NotFoundPage";

const HomeRouter = () => {
  // Dit is de plaats waarin we alle mogelijke routes gaan definiëren
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      {/* Routes nesten */}
      <Route path="/huizen">
        {/* Welk dat de eerste pagina moet zijn a.h.v de index prop */}
        <Route index element={<Homepage />} />
        <Route path=":id" element={<HuisDetailPage />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default HomeRouter;