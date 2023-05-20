import React, { useState, useEffect } from "react";
import test from "../assets/images/takju_color.png";
import Input from "../components/common/Input";
import "../assets/styles/purchase.css";
import Checkbox from "../components/signup/Checkbox";
import logo from "../assets/images/logo_soolpanda.png";
import "../assets/styles/join-success.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

/* 데이터 수정 필요 */

function PurchaseForm({ order }) {
  const [productCode, setProductCode] = useState("");
  const [orderId, setOrderId] = useState("");
  const [orderName, setOrderName] = useState("");
  const [orderPhoneNumber, setOrderPhoneNumber] = useState("");
  const [orderAddr, setOrderAddr] = useState("");
  const [orderPostCode, setOrderPostCode] = useState("");
  const [orderMessage, setOrderMessage] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productEa, setProductEa] = useState("");
  const [orderAmount, setOrderAmount] = useState("");
  const [agreement1, setAgreeMent1] = useState(false);
  const [agreement2, setAgreeMent2] = useState(false);
  const [agreement3, setAgreeMent3] = useState(false);
  const [action, setAction] = useState(0);
  const [sellerId, setsellerId] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productCode);
    console.log(orderId);
    console.log(orderPhoneNumber);
    console.log(orderName);
    console.log(orderAddr);
    console.log(orderPostCode);
    console.log(orderMessage);
    console.log(productPrice);
    console.log(productEa);
    console.log(orderAmount);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "orderName":
        setOrderName(value);
        break;
      case "orderPhoneNumber":
        setOrderPhoneNumber(value);
        break;
      case "orderAddr":
        setOrderAddr(value);
        break;
      case "orderPostCode":
        setOrderPostCode(value);
        break;
      case "orderMessage":
        setOrderMessage(value);
        break;
      default:
        break;
    }
  };

  const requiredCheck = () => {
    if (orderName === "") {
      alert("수령인을 작성해주세요");
      return false;
    }
    if (orderPhoneNumber === "") {
      alert("연락처를 작성해주세요");
      return false;
    }
    if (orderAddr === "") {
      alert("주소를 작성해주세요");
      return false;
    }
    if (orderPostCode === "") {
      alert("우편번호를 작성해주세요");
      return false;
    }

    if (agreement1 === true && agreement2 === true && agreement3 === true) {
      if (window.confirm("주문하시겠습니까?")) {
        axios
          .post("http://localhost:8080/Order", {
            order_num: "",
            order_id: window.sessionStorage.getItem("user_id"),
            seller_id: order.user_id,
            prod_num: order.prod_num,
            prod_name: order.prod_name,
            prod_price: order.prod_price * order.prod_ea + 3000,
            prod_ea: order.prod_ea,
            order_name: orderName,
            order_postcode: orderPostCode,
            order_addr: orderAddr,
            order_tel: orderPhoneNumber,
            order_message: orderMessage,
            order_image: order.prod_image,
          })
          .then((res) => {
            let { data } = res;
            console.log(data);
            setAction(1);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      alert("필수항목을 체크해주세요");
    }
  };

  if (action === 0) {
    return (
      <div className="test">
        <div className="purchase_form_box">
          <form onSubmit={handleSubmit}>
            <h2 className="header">주문 / 결제</h2>
            <section className="product_data_box">
              <div>
                <img src={`http://localhost:8080/download?img=${order.prod_image}`} alt=""></img>
                <div className="product_amount_name">
                  <div>제품명 : {order.prod_name}</div>
                  <div>가격 : {order.prod_price} 원</div>
                  <div>주종 : {order.prod_category}</div>
                </div>
              </div>
            </section>
            <section className="delivery_box">
              <h3>배송지</h3>
              <ul>
                <li className="orderName">
                  <Input
                    label="수령인"
                    type="text"
                    id="orderName"
                    name="orderName"
                    value={orderName}
                    onChange={handleChange}
                    placeholder={"수령받으시는 분의 이름을 입력하세요."}
                  />
                </li>
                <li className="orderPhoneNumber">
                  <Input
                    label="연락처"
                    type="text"
                    id="orderPhoneNumber"
                    name="orderPhoneNumber"
                    value={orderPhoneNumber}
                    onChange={handleChange}
                    placeholder={"수령받으시는 분의 연락처를 입력하세요."}
                  />
                </li>
                <li className="orderAddr">
                  <Input
                    label="배송지 주소"
                    type="text"
                    id="orderAddr"
                    name="orderAddr"
                    value={orderAddr}
                    onChange={handleChange}
                    placeholder={"수령받으시는 분의 주소를 입력하세요."}
                  />
                </li>
                <li className="orderPostCode">
                  <Input
                    label="우편번호"
                    type="text"
                    id="orderPostCode"
                    name="orderPostCode"
                    value={orderPostCode}
                    onChange={handleChange}
                    placeholder={"우편번호"}
                  />
                </li>
                <li className="orderMessage">
                  <Input
                    label="배송메모"
                    type="text"
                    id="orderMessage"
                    name="orderMessage"
                    value={orderMessage}
                    onChange={handleChange}
                    placeholder={"요청사항을 입력해주세요."}
                  />
                </li>
              </ul>
            </section>
            <section className="amount_box">
              <h3>결제금액</h3>
              <ul>
                <li className="amount_list">
                  <div>상품금액</div>
                  <div>{order.order_price}원</div>
                </li>
                <li className="amount_list">
                  <div>개수</div>
                  <div>{order.prod_ea}개</div>
                </li>
                <li className="amount_list">
                  <div>배송비</div>
                  <div>3000원</div>
                </li>
                <li className="amount_list">
                  <div>총 결제 금액</div>
                  <div>{order.order_price + 3000}원</div>
                </li>
              </ul>
            </section>
            <section className="agreement_box">
              <div className="check_box">
                <Checkbox checked={agreement1} onChange={setAgreeMent1}>
                  <span>술판다 서비스 이용약관 동의 (필수)</span>
                </Checkbox>
                <Checkbox checked={agreement2} onChange={setAgreeMent2}>
                  <span>개인정보 수집 이용 동의 (필수)</span>
                </Checkbox>
                <Checkbox checked={agreement3} onChange={setAgreeMent3}>
                  <span>개인정보 제3자 제공 동의 (필수)</span>
                </Checkbox>
              </div>
            </section>
            {/* <button
              className="submit_button"
              type="submit"
              onClick={() => {
                requiredCheck();
              }}
            >
              구매하기
            </button> */}
            <input type="button" className="submit_button" onClick={requiredCheck} value="구매하기" />
          </form>
        </div>
      </div>
    );
  }
  if (action === 1) {
    return (
      <div>
        <div className="success-wrap">
          <div className="success-image">
            <img src={logo} alt="Logo" />
            <h1>
              <br />
              주문이 완료되었습니다.
            </h1>
          </div>
          <div className="success-cont">
            <p>
              감사합니다! <br />
              저희 술판다의 제품을 구매해주셔서 감사합니다.
            </p>
            <p>
              *구매 내역 확인 및 주문취소는 <span>마이페이지 &gt; 구매내역</span> 에서 가능합니다.
            </p>
          </div>
          <div>
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              메인페이지
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default PurchaseForm;
