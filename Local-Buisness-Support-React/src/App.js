import * as React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./App.css";
import AdminHome from "./components/AdminHome";
import AddCategory from "./components/AddCategory";
import AddState from "./components/AddState";
import AddCity from "./components/AddCity";
import Home from "./components/Home";
import AddBusiness from "./components/AddBusiness";
import AddBusinessMember from "./components/AddBusinessMember";
import MemberLogin from "./components/MemberLogin";
import MemberHome from "./components/MemberHome";
import BuisnessHome from "./components/BuisnessHome";
import BuisnessLogin from "./components/BuisnessLogin";
import AddItem from "./components/AddItem";
import ShoppingHome from "./components/ShoppingHome";
import CityShops from "./components/CityShops";
import BusinessItems from "./components/BusinessItems";
import Cart from "./components/Cart";
import UserLogin from "./components/UserLogin";
import MyOrder from "./components/MyOrder";
import OrderRequest from "./components/OrderRequest";
import BusinessOrder from "./components/BusinessOrder";
import BusinessCrudItems from "./components/BusinessCrudItem";
import CrudBuiness from "./components/CrudBusiness";
import BusinessList from "./components/BusinessList";
import SearchItems from "./components/SearchItems";
import NotFound from "./components/NotFound";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/Home" />,
  },
  {
    path: "/admin",
    children: [
      {
        index: true,
        element: <AdminHome></AdminHome>,
      },
      {
        path: "add-category",
        element: <AddCategory></AddCategory>,
      },
      {
        path: "add-state",
        element: <AddState></AddState>,
      },
      {
        path: "add-city",
        element: <AddCity></AddCity>,
      },
    ],
  },
  {
    path: "/Home",
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "add-business-member",
        element: <AddBusinessMember></AddBusinessMember>,
      },

      {
        path: "login",
        element: <MemberLogin></MemberLogin>,
      },
      {
        path : "business-login",
        element: <BuisnessLogin></BuisnessLogin>
      }
    ],
  },
  {
    path : "/ShoppingHome",
    children : [
      {
        index : true,
        element : <ShoppingHome></ShoppingHome>
      },
      {
        path: "business/:businessId/items",
        element: <BusinessItems />,
      },
      {
        path: "login",
        element: <UserLogin></UserLogin>
      },
      {
        path: "buisness-category/:categoryName",
        element : <BusinessList></BusinessList>
      },
      {
        path : "item/:itemName",
        element: <SearchItems></SearchItems>
      }
    ]
  },
  {
    path: "/cart",
    children :[
      {
        index : true,
        element: <Cart></Cart>
      }
    ]
  },
  {
    path: "/myorder",
    element : <MyOrder></MyOrder>
  },
  {
    path : "/card",
    element : <CityShops></CityShops>
  },
  {
    path : "/OrderRequest",
    element : <OrderRequest></OrderRequest>
  },
  {
    path : "/BusinessOrders",
    element : <BusinessOrder></BusinessOrder>
  },
  {
    path : "/myitems",
    element: <BusinessCrudItems></BusinessCrudItems>
  },
  {
    path: "/mybusiness",
    element: <CrudBuiness></CrudBuiness>
  },
  {
    path: "/notfound",
    element: <NotFound></NotFound>
  }
  
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
