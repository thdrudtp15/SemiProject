import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCardCategory from "../components/main/ProductCardCategory";
import axios from "axios";
import Loading from "../components/common/Loading";

const ItemList = ({ category }) => {
  const [alcohol, setAlcohol] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:8080/list");
        if (category === "product") {
          console.log(res.data);
          setAlcohol(res.data);
        } else {
          setAlcohol(res.data.filter((x) => x.prod_category === category));
        }
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [category]);

  // 대기 중일 때
  if (loading) {
    <Loading />;
    return <Loading isLoading={loading} />;
  }
  // 아직 값이 설정되지 않았을 때
  if (!alcohol) {
    return null;
  }
  // <div className={`code_box${codeMessage ? (isCode ? " valid" : " invalid") : ""}`}>
  // 값이 유효할 때
  return (
    <ProductCardCategory
      key={alcohol.id}
      alcohol={alcohol}
      category={category}
    />
  );
};

const CategoryPage = () => {
  const params = useParams();
  // 카테고리가 선택되지 않았으면 기본값 all로 사용
  const category = params.category || "all";

  return <ItemList category={category} />;
};

export default CategoryPage;
