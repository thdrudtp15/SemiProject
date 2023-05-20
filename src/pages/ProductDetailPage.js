import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DetailData from "../components/product/DetailData";
import "../assets/styles/product-detail.css";
import Loading from "../components/common/Loading";

const DetailItem = ({ product_num, setorder, order }) => {
  const [productData, setProductData] = useState();
  // const [loading, setLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const prod_num = Number(product_num);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8080/detail`, {
          params: { prod_num: prod_num },
        });
        console.log(res.data);
        setProductData(res.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [prod_num]);

  // 대기 중일 때
  if (loading) {
    return <Loading isLoading={loading} />;
  }

  // 아직 값이 설정되지 않았을 때
  if (!productData) {
    return <Loading isLoading={loading} />;
  }

  // 값이 유효할 때

  return (
    <DetailData productData={productData} setorder={setorder} order={order} />
  );
};

const ProductDetailPage = ({ setorder, order }) => {
  const params = useParams();
  // 카테고리가 선택되지 않았으면 기본값 all로 사용
  const num = params.id;

  return <DetailItem product_num={num} setorder={setorder} order={order} />;
};

export default ProductDetailPage;
