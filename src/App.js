import React, { useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Restorant from "./pages/Restorant";
import Products from "./pages/Products";
import Navbar from "./components/NavBar";
import Blogs from "./pages/Blogs";
import SingleBlogPage from "./pages/SingleBlogPage";
import Footer from "./components/Footer";
import Recipe from "./pages/Recipes";
import SingleRecipe from "./pages/SingleRecipes";
import Doctor from "./pages/Doctors";
import Community from "./pages/Community";
import SignupForm from "./pages/signUpForm";
import LoginForm from "./pages/loginForm";

// effect to fetch user from backend using auth token from local storage



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/restaurant" element={<Restorant />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/sign-up" element={<SignupForm />}></Route>
        <Route path="/blogs-single" element={<SingleBlogPage />}></Route>
        <Route path="/recipe" element={<Recipe />}></Route>
        <Route path="/recipe-poha" element={<SingleRecipe />}></Route>
        <Route path="/wheat-allergy" element={<SingleBlogPage />}></Route>
        <Route path="/consultants" element={<Doctor />}></Route>
        <Route path="/community" element={<Community />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
