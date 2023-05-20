import { useState } from "react";
import ProductList from "../components/mypage/ProductList";
import SalesList from "../components/mypage/SalesList";
import PurchaseList from "../components/mypage/PurchaseList";
import WishList from "../components/mypage/WishList";
import UserUpdate from "../components/mypage/UserUpdate";
import Passwordcheck from "../components/mypage/Passwordcheck";

import "../assets/styles/my-page.css";

function MyPage() {
  const [activeTab, setActiveTab] = useState(0);

  const onHandleClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="my_page_box">
      <div className="nav_box">
        <div className="header">마이페이지</div>
        <ul>
          <li className={activeTab === 0 ? "active" : ""} onClick={() => onHandleClick(0)}>
            상품 관리
          </li>
          <li className={activeTab === 1 ? "active" : ""} onClick={() => onHandleClick(1)}>
            위시리스트
          </li>
          <li className={activeTab === 2 ? "active" : ""} onClick={() => onHandleClick(2)}>
            판매 내역
          </li>
          <li className={activeTab === 3 ? "active" : ""} onClick={() => onHandleClick(3)}>
            구매 내역
          </li>
          <li className={activeTab === 4 ? "active" : ""} onClick={() => onHandleClick(4)}>
            개인정보 수정
          </li>
        </ul>
      </div>
      <div className="page_info">
        {activeTab === 0 && <ProductList />}
        {activeTab === 1 && <WishList />}
        {activeTab === 2 && <SalesList />}
        {activeTab === 3 && <PurchaseList />}
        {activeTab === 4 && <Passwordcheck setActiveTab={setActiveTab} />}
        {activeTab === 5 && <UserUpdate setActiveTab={setActiveTab} />}
      </div>
    </div>
  );
}

export default MyPage;
