import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SalesUpdatePage from "./pages/SalesUpdatePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CategoryPage from "./pages/CategoryPage";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import SignupPage from "./pages/SignupPage";
import SalesPage from "./pages/SalesPage";
import PurchasePage from "./pages/PurchasePage";
import "./assets/styles/reset.css";
import MyPage from "./pages/MyPage";
import JoinSuccess from "./pages/JoinSuccess";
import SalesPaget from "./upload/SalesPaget";
import UploadFilezzz from "./upload/dzdz";
import UploadFile from "./upload/dropzone";
import DeleteAccount from "./pages/DeleteAccount";
import Like from "./components/product/Like";

function App() {
  //주문페이지로 정보를넘기기위한 state
  const [order, setorder] = useState({});

  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" exact={true} element={<MainPage />} />
        <Route path="/product/update" element={<SalesUpdatePage />} />
        <Route exact path="/products/:id" element={<ProductDetailPage setorder={setorder} order={order} />} />
        <Route exact path="/:category" element={<CategoryPage />} />
        <Route path="/products" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/product/new" element={<SalesPage />} />
        <Route path="/purchase" element={<PurchasePage order={order} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/joinsuccess" element={<JoinSuccess />} />
        <Route path="/dz" element={<UploadFilezzz />} />
        <Route path="/a" element={<UploadFile />} />
        <Route path="/deleteaccount" element={<DeleteAccount />} />

        <Route path="/like" element={<Like />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
