import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Login from "../pages/Login";
import { token } from "../service/user.service";
import Register from "../pages/register/Register";
import Payment from "../pages/payment/Payment";
import Profile from "../pages/profile/Profile";
import Restaurant from "../pages/restaurant/Restaurant";
import CreateRestaurant from "../pages/restaurant/CreateRestaurant";
import Home from "../pages/home/Home";
import Updateprofile from "../pages/profile/Updateprofile";
import Products from "../pages/products/Products";
import CreateProduct from "../pages/products/CreateProduct";
import PaymentDone from "../pages/payment/PaymentDone";
import PaymentForm from "../pages/payment/PaymentForm";
import RestaurantMenu from "../pages/restaurant/RestaurantMenu";


const Index = () => {
    const user = token

  return (
    <div>
      <BrowserRouter>
      <nav>
        <Navbar />
      </nav>

      <Routes >

      <Route path="/" element={<Home /> } />


         {/*Restaurant*/} 
      {!user ? (
          <Route path="/restaurants" element={<Login /> } />
        ) : (
          <Route path="/restaurants" element={<Restaurant />} />
        )}
      {!user ? (
          <Route path="/restaurants" element={<Restaurant /> } />
        ) : (
          <Route path="/create-restaurant" element={<CreateRestaurant />} />
        )}
        <Route path="/restaurant/:restaurantId" element={<RestaurantMenu/>} />




      {!user ? (
        <Route path="/registration" Component={Register } />
        ): (
        <Route path="/registration" element={<Navigate to="/" />} />
        )} 

      {!user ? (
          <Route path="/payment" element={<Login />} />
         ) : (
          <Route path="/payment" element={<Payment/>} />
         )}
          <Route path="/payment-done" element={<PaymentDone />} />

          {user ? (
          <Route path="/profile" Component={Profile} />
        ):(
          <Route path="/profile" element={<Navigate to="/" />} />
        )}
      {user ? (
          <Route path="/update-profile" Component={Updateprofile} />
        ):(
          <Route path="/update-profile" element={<Navigate to="/" />} />
        )}


      {user ? (
          <Route path="/products" Component={Products } />
        ):(
          <Route path="/products" element={<Navigate to="/" />} />
        )}

      {user ? (
          <Route path="/product/create" Component={CreateProduct} />
        ):(
          <Route path="product/create" element={<Navigate to="/" />} />
        )}


      {user ? (
          <Route path="/checkform" Component={PaymentForm} />
        ):(
          <Route path="checkform" element={<Navigate to="/" />} />
        )}
      
      </Routes>
      </BrowserRouter>
    </div>
  )
};

export default Index;
