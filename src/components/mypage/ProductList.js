import React from "react";
import ProductCard from "./ProductCard";

const ProductList = () => {
  return (
    <>
      <div className="header_box">
        <h3 className="header">판매 중인 상품</h3>
      </div>
      <div className="product_list_box">
        <ProductCard></ProductCard>
      </div>
    </>
  );
};

export default ProductList;
