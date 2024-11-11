import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import App from "./App.jsx";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Profile from "./pages/Profile";
import TripDetails from "./pages/TripDetails";
import TripsByCategory from "./pages/TripsByCategory.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NoMatch />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/trips/:tripId",
        element: <TripDetails />,
      },
      {
        path: "/trips/:category",
        element: <TripsByCategory />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
