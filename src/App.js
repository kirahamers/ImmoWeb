import React from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import AdminFilter from "./components/AdminFilter";
import Filter from "./components/Filter";
import LogIn from "./components/LogIn";
import LogOut from "./components/LogOut";
import Navigation from "./components/Navigation";
import NavigationAdmin from "./components/NavigationAdmin";
import AddPand from "./components/AddPand";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./pages/Homepage";
import HuisDetailPage from "./pages/HuisDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import AppLayout from "./navigation/AppLayout";
import FavoritesPage from "./pages/FavoritesPage";
import AdminPage from "./pages/AdminPage";
import AdminHuisDetailPage from "./pages/AdminHuisDetailPage";

const browserRouter = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
      },
      {
        path: "huizen",
        element: <Homepage />,
      },
      {
        path: "huizen/:id",
        element: <HuisDetailPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "admin",
        element: <AdminPage />,
      },
      {
        path: "adminhuizen",
        element: <AdminPage />,
      },
      {
        path: "adminhuizen/:id",
        element: <AdminHuisDetailPage />,
      },
      {
        path: "logout",
        element: <LogOut />,
      },
      {
        path: "addpand",
        element: <AddPand />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={browserRouter}></RouterProvider>;
}

export default App;
