import React, { useState, useEffect } from "react";
import axios from "axios";
import SaleCard from "./SaleCard";

const SalesList = () => {
  const [posts, setPosts] = useState([]);

  return (
    <>
      <div className="header_box">
        <h3 className="header">판매 내역</h3>
      </div>
      <div className="sales_list_box">
        <SaleCard />
      </div>
    </>
  );
};

export default SalesList;
