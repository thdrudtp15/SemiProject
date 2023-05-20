import React, { useEffect, useState } from "react";
import axios from "axios";

const SaleCard = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(3);
  const [purchaseList, setPurchaseList] = useState([]);

  //데이터 리스트 뽑기
  useEffect(() => {
    list();
  }, []);

  const 데이터보기 = () => {
    console.log("배열 길이", purchaseList.length);
    //console.log(currentProducts);
  };

  // 페이지 수 계산
  const totalPages = Math.ceil(purchaseList.length / productsPerPage);

  // 페이지별로 보여줄 상품 데이터 선택
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = purchaseList.slice(indexOfFirstProduct, indexOfLastProduct);

  // 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  }

  const OrderCancellation = (e) => {
    if (window.confirm("주문을 취소하시겠습니까?")) {
      axios
        .post("http://localhost:8080/OrderCancellation", { order_num: e.target.name })
        .then((res) => {
          let { data } = res;
          list();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const list = () => {
    axios
      .post("http://localhost:8080/SaleList", { seller_id: window.sessionStorage.getItem("user_id") })
      .then((res) => {
        let { data } = res;
        console.log(data);
        setPurchaseList(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      {currentProducts.map((product) => (
        <div className="order_card" key={product.order_num}>
          <div className="order_image">
            <div>
              <img className="product_image" src={`http://localhost:8080/download?img=${product.order_image}`} alt="" />
            </div>
          </div>
          <div className="order_wrap">
            <div className="order_box box1">
              <div className="order_productName">
                <label>상품명</label>
                <div>
                  <a href={"products/" + product.prod_num}>{product.prod_name}</a>
                </div>
              </div>
              <div className="order_date">
                <label>주문 날짜</label>
                <div>{product.order_date}</div>
              </div>
              <div className="order_price">
                <label>가격</label>
                <div>{addComma(product.prod_price)} 원</div>
              </div>
              <div className="order_tot_amount">
                <label>갯수</label>
                <div>{product.prod_ea} 개 </div>
              </div>
            </div>
            <div className="order_box box2">
              <div className="order_buyerName">
                <label>구매자</label>
                <div>{product.order_name}</div>
              </div>
              <div className="order_buyerId">
                <label>구매 ID</label>
                <div>{product.order_id}</div>
              </div>
              <div className="order_buyerTel">
                <label>구매자 번호</label>
                <div>{product.order_tel}</div>
              </div>
            </div>
            {/* <div className="order_buyerAddrCode">
              <label>구매자 우편번호</label>
              <div>{buyerAddrCode}</div>
            </div> */}
            <div className="order_box box3">
              <div className="order_buyerAddr">
                <label>구매자 주소</label>
                <div>
                  {product.order_addr}({product.order_postcode})
                </div>
              </div>
            </div>
          </div>
          <div className="button_box">
            <button>주문 확인</button>
            <button type="button" name={product.order_num} onClick={OrderCancellation}>
              주문취소
            </button>
          </div>
        </div>
      ))}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
            {pageNumber}
          </button>
        ))}
      </div>
      <div>
        {purchaseList.length === 0 ? (
          <div style={{ margin: "100px auto" }}>
            <center style={{ fontSize: "25px" }}>요청된 주문이 없습니다.</center>
            <div style={{ height: "600px" }}></div>
          </div>
        ) : (
          " "
        )}
      </div>
    </>
  );
};

export default SaleCard;
