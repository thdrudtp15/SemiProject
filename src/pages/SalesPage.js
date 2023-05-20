import { useState, useRef } from "react";
import ImageBox from "../components/sales/ImageBox";
import axios from "axios";
import Input from "../components/common/Input.js";
import "../assets/styles/sales.css";
import CategorySelector from "../components/purchase/CategorySelector";
const initialProductData = {
  user_id: window.sessionStorage.getItem("user_id"),
  prod_name: "",
  prod_category: "",
  prod_abv: "",
  prod_volume: "",
  prod_price: "",
  prod_stock: "",
  prod_tag: "",
  prod_info: "",
  prod_date: new Date().toISOString().slice(0, 10),
  prod_readcount: "",
  prod_wish: "",
  prod_shipping: "",
};

const SalesPage = () => {
  const [productData, setProductData] = useState(initialProductData);
  const [images, setImages] = useState([]);
  const [prod_num, setProd_num] = useState();
  const prod_name = useRef("");
  const prod_category = useRef("");
  const prod_abv = useRef("");
  const prod_volume = useRef("");
  const prod_price = useRef("");
  const prod_stock = useRef("");
  const prod_tag = useRef("");
  const prod_info = useRef("");

  const formData = new FormData();

  const requiredFields = [
    {
      message: "주종을 선택해주세요.",
      key: "prod_category",
      ref: prod_category,
    },
    {
      message: "상품명을 입력해주세요.",
      key: "prod_name",
      ref: prod_name,
    },
    { message: "태그를 입력해주세요.", key: "prod_tag", ref: prod_tag },
    { message: "도수를 입력해주세요.", key: "prod_abv", ref: prod_abv },
    {
      message: "용량을 입력해주세요.",
      key: "prod_volume",
      ref: prod_volume,
    },
    {
      message: "가격을 입력해주세요.",
      key: "prod_price",
      ref: prod_price,
    },
    {
      message: "재고를 입력해주세요.",
      key: "prod_stock",
      ref: prod_stock,
    },
    {
      message: "상세 설명을 입력해주세요.",
      key: "prod_info",
      ref: prod_info,
    },
  ];

  const handleSubmit = async (e) => {
    console.log(productData);
    e.preventDefault();

    for (const field of requiredFields) {
      if (!productData[field.key]) {
        console.log(field.ref.current.value);
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

    const insertData = async () => {
      try {
        if (images.length === 0) {
          alert("이미지를 추가하세요");
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          return;
        }
        const response = await axios.post("http://localhost:8080/insert", productData);
        const num = response.data; //@useGenerateKey 사용하여 받아옴
        setProd_num(response.data); //@useGenerateKey 사용하여 받아옴
        images.forEach((images) => {
          formData.append("uploadfiles", images);
          formData.append("prod_num", Number(response.data)); //@useGenerateKey 사용하여 받아옴
        });
        await axios
          .post("http://localhost:8080/upload", formData)
          .then((res) => {
            alert("상품이 정상적으로 등록되었습니다!");
            console.log(num);
            window.location.href = `/products/${num}`;
          })
          .catch((e) => {
            console.error(e);
          });
      } catch (e) {
        console.log(e);
      }
    };
    insertData();
  };

  const onDrop = (acceptedFiles) => {
    setImages((prevState) => [...prevState, ...acceptedFiles]);
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
            id="prod_category"
            name="prod_category"
            value={productData.prod_category}
            onChange={handleChange}
            ref={prod_category}
            handleCategoryChange={setProductData}
          />
        </div>
        <div className="imageBox">
          <ImageBox onDrop={onDrop} files={images} />
        </div>
        <div className="product_name_box">
          <Input
            label="상품명"
            type="text"
            id="prod_name"
            name="prod_name"
            value={productData.prod_name}
            onChange={handleChange}
            ref={prod_name}
            placeholder={"상품명"}
          />
        </div>
        <div className="product_tag_box">
          <Input
            label="태그"
            type="text"
            id="prod_tag"
            name="prod_tag"
            value={productData.prod_tag}
            onChange={handleChange}
            ref={prod_tag}
            placeholder={"#태그"}
          />
        </div>
        <div class="abv_volume_container">
          <div className="product_abv_box">
            <Input
              label="도수"
              type="input"
              id="prod_abv"
              name="prod_abv"
              value={productData.prod_abv}
              onChange={handleChange}
              ref={prod_abv}
              placeholder={"도수"}
            />
            <span className="suffix">%</span>
          </div>
          <div className="product_volume_box">
            <Input
              label="용량"
              type="input"
              id="prod_volume"
              name="prod_volume"
              value={productData.prod_volume}
              onChange={handleChange}
              ref={prod_volume}
              placeholder={"용량"}
            />
            <span className="suffix">ml</span>
          </div>
        </div>
        <div class="price_stock_container">
          <div className="product_price_box">
            <Input
              label="가격"
              type="input"
              id="prod_price"
              name="prod_price"
              value={productData.prod_price}
              onChange={handleChange}
              ref={prod_price}
              placeholder={"가격"}
            />
            <span className="suffix">원</span>
          </div>
          <div className="product_stock_box">
            <Input
              label="재고"
              type="input"
              id="prod_stock"
              name="prod_stock"
              value={productData.prod_stock}
              onChange={handleChange}
              ref={prod_stock}
              placeholder={"재고"}
            />
            <span className="suffix">개</span>
          </div>
        </div>
        <div className="product_info_box">
          <Input
            label="상세설명"
            type="textarea"
            id="prod_info"
            name="prod_info"
            value={productData.prod_info}
            onChange={handleChange}
            ref={prod_info}
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
