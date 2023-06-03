import React from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LogIn from "./components/LogIn";
import LogOut from "./components/LogOut";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./pages/Homepage";
import HuisDetailPage from "./pages/HuisDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import AppLayout from "./navigation/AppLayout";
import FavoritesPage from "./pages/FavoritesPage";
import AdminPage from "./pages/AdminPage";
import AdminHuisDetailPage from "./pages/AdminHuisDetailPage";
import AdminAddPandPage from "./pages/AdminAddPandPage";
import AdminEditPandPage from "./pages/AdminEditPandPage";

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
        element: <AdminAddPandPage />,
      },
      {
        path: "/admin/huizen/:id/bewerken",
        element: <AdminEditPandPage />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={browserRouter}></RouterProvider>;
}

export default App;
