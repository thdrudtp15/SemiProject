import { useState, useRef } from "react";
import ImageBox from "../components/sales/ImageBox";
import axios from "axios";
import Input from "../components/common/Input.js";
import "../assets/styles/sales.css";
import CategorySelector from "../components/purchase/CategorySelector";
import UploadFile from "./dropzone";

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
};

const SalesPage = () => {
  const [productData, setProductData] = useState(initialProductData);
  const [images, setimages] = useState([]);
  const product_name = useRef("");
  const product_category = useRef("");
  const product_abv = useRef("");
  const product_volume = useRef("");
  const product_price = useRef("");
  const product_stock = useRef("");
  const product_tag = useRef("");
  const product_info = useRef("");

  const requiredFields = [
    { message: "주종을 선택해주세요.", key: "product_category", ref: product_category },
    { message: "상품명을 입력해주세요.", key: "product_name", ref: product_name },
    { message: "태그를 입력해주세요.", key: "product_tag", ref: product_tag },
    { message: "도수를 입력해주세요.", key: "product_abv", ref: product_abv },
    { message: "용량을 입력해주세요.", key: "product_volume", ref: product_volume },
    { message: "가격을 입력해주세요.", key: "product_price", ref: product_price },
    { message: "재고를 입력해주세요.", key: "product_stock", ref: product_stock },
  ];

  const handleSubmit = async (e) => {
    console.log(productData);
    e.preventDefault();

    for (const field of requiredFields) {
      if (!productData[field.key]) {
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

    const formData = new FormData();
    images.forEach((images) => {
      formData.append("uploadfiles", images);
    });
    await axios.post("http://localhost:8080/upload", formData);
    alert("이미지 업로드 성공!");
  };

  const onDrop = (acceptedFiles) => {
    setimages(acceptedFiles);
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
        <h2 className="header">기본 정보</h2>
        <div className="categoryBox">
          <CategorySelector
            label="주종"
            type="button"
            id="product_category"
            name="product_category"
            value={productData.product_category}
            onChange={handleChange}
            ref={product_category}
            handleCategoryChange={setProductData}
          />
        </div>
        <div className="imageBox">
          <UploadFile onDrop={onDrop} files={images} />
        </div>
        <div className="product_name_box">
          <Input
            label="상품명"
            type="text"
            id="product_name"
            name="product_name"
            value={productData.product_name}
            onChange={handleChange}
            ref={product_name}
            placeholder={"상품명"}
          />
        </div>
        <div className="product_tag_box">
          <Input
            label="태그"
            type="text"
            id="product_tag"
            name="product_tag"
            value={productData.product_tag}
            onChange={handleChange}
            ref={product_tag}
            placeholder={"#태그"}
          />
        </div>
        <div className="abv_volume_container">
          <div className="product_abv_box">
            <Input
              label="도수"
              type="input"
              id="product_abv"
              name="product_abv"
              value={productData.product_abv}
              onChange={handleChange}
              ref={product_abv}
              placeholder={"도수"}
            />
            <span className="suffix">%</span>
          </div>
          <div className="product_volume_box">
            <Input
              label="용량"
              type="input"
              id="product_volume"
              name="product_volume"
              value={productData.product_volume}
              onChange={handleChange}
              ref={product_volume}
              placeholder={"용량"}
            />
            <span className="suffix">ml</span>
          </div>
        </div>
        <div className="price_stock_container">
          <div className="product_price_box">
            <Input
              label="가격"
              type="input"
              id="product_price"
              name="product_price"
              value={productData.product_price}
              onChange={handleChange}
              ref={product_price}
              placeholder={"가격"}
            />
            <span className="suffix">원</span>
          </div>
          <div className="product_stock_box">
            <Input
              label="재고"
              type="input"
              id="product_stock"
              name="product_stock"
              value={productData.product_stock}
              onChange={handleChange}
              ref={product_stock}
              placeholder={"재고"}
            />
            <span className="suffix">개</span>
          </div>
        </div>
        <div className="product_info_box">
          <Input
            label="상세설명"
            type="textarea"
            id="product_info"
            name="product_info"
            value={productData.product_info}
            onChange={handleChange}
            ref={product_info}
            placeholder={"판매하실 상품에 대해 상세하게 작성해주세요."}
          />
        </div>
        <button className="submit_button" type="submit">
          등록하기
        </button>
      </form>
    </div>
  );
};

export default SalesPage;
