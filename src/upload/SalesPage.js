import { useState, useRef } from "react";
import dropzone from "./dropzone";
import axios from "axios";
import "../assets/styles/sales.css";

const initialProductData = {
  product_name: "",
  product_category: "",
  product_abv: "",
  product_volume: "",
  product_price: "",
  product_stock: "",
  product_tag: "",
  product_info: "",
  product_date: new Date().toISOString().slice(0, 10),
  product_images: [],
};

const SalesPage = () => {
  const [productData, setProductData] = useState(initialProductData);

  const product_name = useRef("");
  const product_category = useRef("");
  const product_abv = useRef("");
  const product_volume = useRef("");
  const product_price = useRef("");
  const product_stock = useRef("");
  const product_tag = useRef("");
  const product_info = useRef("");
  const product_images = useRef("");

  const requiredFields = [
    { message: "주종을 선택해주세요.", key: "product_category", ref: product_category },
    { message: "상품명을 입력해주세요.", key: "product_name", ref: product_name },
    { message: "태그를 입력해주세요.", key: "product_tag", ref: product_tag },
    { message: "도수를 입력해주세요.", key: "product_abv", ref: product_abv },
    { message: "용량을 입력해주세요.", key: "product_volume", ref: product_volume },
    { message: "가격을 입력해주세요.", key: "product_price", ref: product_price },
    { message: "재고를 입력해주세요.", key: "product_stock", ref: product_stock },
    { message: "상세 설명을 입력해주세요.", key: "product_info ", ref: product_info },
    { message: "이미지를 선택해주세요.", key: "product_images", ref: product_images },
  ];

  const handleSubmit = (e) => {
    console.log(productData);
    e.preventDefault();
    if (!productData.product_images.length) {
      window.alert("이미지를 선택해주세요.");
      return;
    }
    for (const field of requiredFields) {
      if (!productData[field.key]) {
        console.log(field.ref.current.focus());
        window.alert(`${field.message}`);
        field.ref.current.focus();
        const topOffset = window.pageYOffset;
        window.scrollTo({
          top: topOffset - 70,
          behavior: "smooth",
        });
        return;
      }
    }

    axios
      .post("http://localhost:8000/product", productData)
      .then(function (response) {
        const productId = response.data.id;
        window.location.href = `/products/${productId}`;
      })
      .catch(function (error) {})
      .then(function () {});
  };

  const handleChange = (e) => {
    setProductData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="product_form_box">
      <form onSubmit={handleSubmit}>
        <div className="imageBox"></div>
        <dropzone />
        <button className="submit_button" type="submit">
          등록하기
        </button>
      </form>
    </div>
  );
};

export default SalesPage;
