import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./components/User/Login";
import Signup from "./components/User/Signup";
import Contact from "./components/User/Contact";
import About from "./components/User/About";
import Spots from "./components/User/Spots";
import Home from "./components/User/Home";
import Post from "./components/User/Post";
import Spot from "./components/User/Spot";
import AdminLogin from "./components/Admin/AdminLogin";
import BannerManagement from "./components/Admin/BannerManagement";
import Category from "./components/Admin/Category";
import Users from "./components/Admin/Users";
import AdStatus from "./components/Admin/AdStatus";
import AdminHome from "./components/Admin/AdminHome";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import Profile from "./components/User/Profile";
import { UserRoute } from "./components/PrivateRoute/PrivateRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import FrequentlyAskedQuestions from "./components/Admin/FrequentlyAskedQuestions";
import Payment from "./components/User/Payment";
import Box from "./components/User/Box";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <>
          <Provider store={store}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/adminlogin" element={<AdminLogin />} />

              <Route path="/" element={<Home />} />
              <Route path="/spots" element={<Spots />} />
              <Route
                path="/spot/:spotId/*"
                element={
                  <UserRoute>
                    <Spot />
                  </UserRoute>
                }
              />
              <Route
                path="/box/"
                element={
                  <UserRoute>
                    <Box />
                  </UserRoute>
                }
              />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/payment" element={<Payment />} />

              <Route
                path="/post"
                element={
                  <UserRoute>
                    <Post />
                  </UserRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <UserRoute>
                    <Profile />
                  </UserRoute>
                }
              />

              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <AdminHome />
                  </PrivateRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <PrivateRoute>
                    <Users />
                  </PrivateRoute>
                }
              />
              <Route
                path="/faq"
                element={
                  <PrivateRoute>
                    <FrequentlyAskedQuestions />
                  </PrivateRoute>
                }
              />
              <Route
                path="/category"
                element={
                  <PrivateRoute>
                    <Category />
                  </PrivateRoute>
                }
              />
              <Route
                path="/status"
                element={
                  <PrivateRoute>
                    <AdStatus />
                  </PrivateRoute>
                }
              />
              <Route
                path="/banner"
                element={
                  <PrivateRoute>
                    <BannerManagement />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Provider>
        </>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
