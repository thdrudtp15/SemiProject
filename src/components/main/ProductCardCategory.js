import { useState, useEffect } from "react";
import "../../assets/styles/product-card.css";
import { NavLink } from "react-router-dom";

const Card = (props) => {
  function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  }
  var productprice = addComma(props.alcohol.prod_price);
  // if (!props.alcohol.prod_images == undefined)
  var arr = props.alcohol.prod_images.replace("[", "").replace("]", "").replaceAll(" ", "").split(",");

  return (
    <NavLink className="Cardblock" to={`/products/${props.alcohol.prod_num}`} state={{ props }}>
      <div className="Imagebox">
        <img
          className="Productimage"
          src={
            // arr !== undefined ?
            `http://localhost:8080/download?img=${arr[0]}`
            //  : null
          }
          alt=""
        />
      </div>
      <div className="Pname">{props.alcohol.prod_name}</div>
      <div className="Pintro">{props.alcohol.prod_tag}</div>
      <div className="Pprice">{productprice} 원</div>
    </NavLink>
  );
};

function sortByOption(sliced, sortOption) {
  if (sortOption == "wishCount") {
    sliced.sort((a, b) => {
      return b.prod_wish - a.prod_wish;
    });
  } else if (sortOption == "latest") {
    sliced.sort((a, b) => {
      return b.prod_num - a.prod_num;
    });
  } else if (sortOption == "highPrice") {
    sliced.sort((a, b) => {
      return b.prod_price - a.prod_price;
    });
  } else if (sortOption == "lowPrice") {
    sliced.sort((a, b) => {
      return a.prod_price - b.prod_price;
    });
  } else if (sortOption == "viewCount") {
    sliced.sort((a, b) => {
      return b.prod_vCount - a.prod_vCount;
    });
  } else return;
}

const ProductCardCategory = (props) => {
  const [sortOption, setSortOption] = useState("");
  const clickSortOption = (e) => {
    setSortOption(e.target.value);
  };

  // 전체 데이터 중 어디까지 잘라서 보여줄지 - 함수
  const [countMore, setCountMore] = useState(8); //배열 중 몇번째까지
  const [sliced, setSliced] = useState([]); //잘라서 저장
  /* Countmore이 onClick 안에서 바뀌면 재렌더링 됨 */
  useEffect(() => {
    setSliced(props.alcohol.slice(0, countMore));
  }, [countMore]);

  return (
    <div>
      <div className="filter_wrap">
        <div>
          {props.category === "product" ? <h1 className="header">전체 상품</h1> : <h1 className="header">{props.category}</h1>}
        </div>
        <div className="filter_box">
          <div>
            <h1 className="result_count">{props.alcohol.length} 건의 결과가 있어요</h1>
          </div>
          <div className="filter">
            <ul>
              <li>
                <button value="latest" onClick={clickSortOption}>
                  신상품순
                </button>
              </li>
              <li>
                <button value="viewCount" onClick={clickSortOption}>
                  조회순
                </button>
              </li>
              <li>
                <button value="wishCount" onClick={clickSortOption}>
                  인기순
                </button>
              </li>
              <li>
                <button value="highPrice" onClick={clickSortOption}>
                  높은 가격순
                </button>
              </li>
              <li>
                <button value="lowPrice" onClick={clickSortOption}>
                  낮은 가격순
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {sortByOption(sliced, sortOption)}
      <div className="CardboxC">
        {sliced.map((alcohol) => {
          return <Card alcohol={alcohol} />;
        })}
        <button
          className="Morebutton"
          style={{
            visibility: countMore >= props.alcohol.length ? "hidden" : "visible",
          }}
          onClick={() => {
            ///클릭할때마다 8개씩 더 나오게 함
            setCountMore(countMore + 8);
          }}
        >
          더보기
        </button>
      </div>
    </div>
  );
};

export default ProductCardCategory;
