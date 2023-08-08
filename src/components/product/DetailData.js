import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/styles/product-detail.css";
import Slider from "./Slider.js";
import Time from "../../assets/images/time.png";
import Heart from "../../assets/images/heart.png";
import View from "../../assets/images/view.png";

const DetailPageTest = ({ productData, setorder, order }) => {
  const deleteHandler = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .post(`http://localhost:8080/delete`, productData)
        .then((Response) => {
          console.log(Response);
          console.log("성공");
        })
        .catch((Error) => {
          console.log(Error);
        });
      alert("삭제되었습니다.");
    }
  };
  const [number, setNumber] = useState(1);

  //구매 페이지로 데이터 넘기기 위한 함수
  //상세페이지에서 아무런 조작없이(개수를 1로 했을 때)

  // const [vCount, setVCount] = useState(productData.prod_vCount);

  useEffect(() => {
    setorder({
      user_id: productData.user_id,
      prod_name: productData.prod_name,
      prod_price: productData.prod_price,
      prod_category: productData.prod_category,
      order_price: productData.prod_price,
      prod_num: productData.prod_num,
      prod_ea: number,
      prod_image: productData.prod_images.replace("[", "").replace("]", "").replaceAll(" ", "").split(",")[0],
    });
  }, []);

  const order_price = number * productData.prod_price;
  const onClickTest = () => {
    setNumber(number + 1);
    setorder({
      ...order,
      order_price: productData.prod_price * (number + 1),
      prod_ea: number + 1,
    });
    console.log(order_price);
    console.log(order);
  };
  const onClickTest2 = () => {
    if (number > 1) {
      setNumber(number - 1);
      setorder({
        ...order,
        order_price: productData.prod_price * (number - 1),
        prod_ea: number - 1,
      });
    } else {
      alert("개수는 0개 이하로 입력할 수 없습니다.");
    }
  };

  function handleClick() {
    const sessionExists = window.sessionStorage.getItem("user_id");
    if (sessionExists === null) {
      alert("제품 주문은 로그인 후 가능합니다.");
    }
  }

  //==========================================================================================
  //찜하기구현
  const [liked, setLiked] = useState(false);
  const [likecnt, Setlikecnt] = useState();
  useEffect(() => {
    axios
      .post("http://localhost:8080/like/cnt", {
        prod_id: productData.prod_num,
      })
      .then((response) => {
        Setlikecnt(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [productData.user_id, productData.prod_num]);
  useEffect(() => {
    axios
      .post("http://localhost:8080/like/islike", {
        user_id: window.sessionStorage.getItem("user_id"),
        prod_id: productData.prod_num,
      })
      .then((response) => {
        if (response.data === 1) {
          setLiked(true);
          console.log(likecnt);
        } else {
          setLiked(false);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }, [productData.user_id, productData.prod_num]);

  function handleLike() {
    if (liked === true) {
      axios
        .post("http://localhost:8080/like/delete", {
          user_id: window.sessionStorage.getItem("user_id"),
          prod_id: productData.prod_num,
        })
        .then((response) => {
          console.log("좋아요를 지웠슴다.");
          setLiked(false);
          Setlikecnt(likecnt - 1);
          console.log(likecnt);
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      axios
        .post("http://localhost:8080/like/insert", {
          user_id: window.sessionStorage.getItem("user_id"),
          prod_id: productData.prod_num,
        })
        .then((response) => {
          console.log("좋아요를 눌렀슴다.");
          setLiked(true);
          Setlikecnt(likecnt + 1);
          console.log(likecnt);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }

  // ==========================================================================================================
  const navigate = useNavigate();
  const pprice = (number * productData.prod_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const formattedNumber = (1 * productData.prod_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const images = productData.prod_images.replace("[", "").replace("]", "").replaceAll(" ", "");
  const arr = images.split(",");
  return (
    <div id="wrap">
      <div className="need_border_bottom">
        <div className="DetailTop">
          <main className="DetailMain">
            <Slider images={images} />
            <br />
          </main>
          <aside className="DetailSide">
            <div className="title">
              <h2 className="name">{productData.prod_name}</h2>
              <p className="comment">{productData.prod_tag}</p>
              <p className="info price">{formattedNumber}원</p>
            </div>
            <div className="product_info1">
              <div className="heart_count">
                <img src={Heart} style={{ width: 15 }} alt=""></img>
                <div>&nbsp;&nbsp;{likecnt}</div>
              </div>
              <div className="view">
                <img src={View} style={{ width: 15 }} alt=""></img>
                <div>&nbsp;&nbsp;{productData.prod_vCount}</div>
              </div>
              <div className="date">
                <img src={Time} style={{ width: 15 }} alt=""></img>
                <div>&nbsp;&nbsp;{productData.prod_date}</div>
              </div>
            </div>
            <div className="product_info2">
              <ul>
                <li className="info type">
                  &nbsp;&nbsp;&nbsp;&nbsp;주종&nbsp;&nbsp;&nbsp;&nbsp;
                  <div>&nbsp;&nbsp;{productData.prod_category}</div>
                </li>
                <li className="info percent">
                  &nbsp;&nbsp;&nbsp;&nbsp;도수&nbsp;&nbsp;&nbsp;&nbsp;
                  <div>&nbsp;&nbsp;{productData.prod_abv}</div>&nbsp;&nbsp;%
                </li>
                <li className="info capacity">
                  &nbsp;&nbsp;&nbsp;&nbsp;용량&nbsp;&nbsp;&nbsp;&nbsp;
                  <div>&nbsp;&nbsp;{productData.prod_volume}</div>&nbsp;&nbsp;ml
                </li>
              </ul>
            </div>
            {productData.user_id === window.sessionStorage.getItem("user_id") ? (
              <div className="userProduct"></div>
            ) : (
              <div className="product_info3">
                <div className="info3_wrap">
                  <p className="product_amount">
                    총 상품가격&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="sum">{pprice}원</span>
                  </p>
                </div>
                <div className="info btnOpt">
                  <button className="option btnl" onClick={onClickTest2}>
                    -
                  </button>
                  <span>{number}</span>
                  <button className="option btnr" onClick={onClickTest}>
                    +
                  </button>
                </div>
              </div>
            )}
            {/* <button className="buy">구매하기</button> */}
            <div>
              {productData.user_id === window.sessionStorage.getItem("user_id") ? (
                <div className="btnWrap">
                  <Link to={`/product/update`} state={{ productData }}>
                    <button className="btn up">수정하기</button>
                  </Link>
                  <Link to={`/`}>
                    <button className="btn del" onClick={deleteHandler}>
                      삭제하기
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="btnWrap">
                  <Link to={window.sessionStorage.getItem("user_id") === null ? "/login" : "/purchase"}>
                    <button className="btn buy" onClick={handleClick}>
                      구매하기
                    </button>
                  </Link>
                  <Link to="#">
                    <button className={`btn  ${liked ? "liked" : ""}`} onClick={handleLike}>
                      <span className="heart"></span>찜하기
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
      <div className="DetailBottom">
        <div className="detail_header">상세설명</div>
        <pre className="detail_info">{productData.prod_info}</pre>
      </div>
    </div>
  );
};

export default DetailPageTest;
