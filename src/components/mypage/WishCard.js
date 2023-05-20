import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const ProductCard = (props) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);
  const [prod_nums, setProdNums] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(`http://localhost:8080/list`);
      setProducts(res.data);
      //console.log(products);
    };
    fetchProducts();
    userproduct();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8080/like/list", { user_id: sessionStorage.getItem("user_id") });
        console.log(response.data);
        setProdNums(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const userproduct = () => {
    console.log("" + prod_nums);
    console.log("product : " + products.prod_num);
    return products.filter((product) => prod_nums.some((prod_nums) => prod_nums.prod_num === product.prod_num));
  };
  const userproducts = userproduct();

  // 페이지 수 계산
  const totalPages = Math.ceil(userproducts.length / productsPerPage);

  // 페이지별로 보여줄 상품 데이터 선택
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = userproducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  }

  return (
    <div>
      {currentProducts.map((product) => (
        <div className="product_card" key={product.prod_num}>
          <NavLink className="Cardblock" to={`/products/${product.prod_num}`} state={{ product }}>
            <div className="Imagebox">
              <img
                className="Productimage"
                src={`http://localhost:8080/download?img=${
                  product.prod_images.replace("[", "").replace("]", "").replaceAll(" ", "").split(",")[0]
                }`}
                alt=""
              />
            </div>
            <div className="Pname">{product.prod_name}</div>
            <div className="Pintro">{product.prod_tag}</div>
            <div className="Pprice">{addComma(product.prod_price)} 원</div>
          </NavLink>
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
        {userproducts.length === 0 ? (
          <div style={{ margin: "100px auto" }}>
            <center style={{ fontSize: "25px" }}>찜한 상품이 없습니다.</center>
            <div style={{ height: "600px" }}></div>
          </div>
        ) : (
          " "
        )}
      </div>
    </div>
  );
};

export default ProductCard;
