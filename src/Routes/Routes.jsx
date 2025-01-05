import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import OurMenu from "../Pages/OurMenu/OurMenu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: "/",
            element: <Home></Home>,
        },
        {
          path: "menu",
          element: <OurMenu></OurMenu>
        },
        {
          path: "order/:category",
          element: <Order></Order>
        },
        {
          path: "login",
          element: <Login></Login>
        },
        {
          path: "register",
          element: <SignUp></SignUp>,
        },
      ]
    },
    {
      path: "/dashboard",
      element: <Dashboard></Dashboard>,
      children: [
        {
          path: "cart",
          element: <Cart></Cart>
        }
      ]
    }
  ]);
  