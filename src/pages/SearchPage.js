import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCardCategory from "../components/main/ProductCardCategory";
import axios from "axios";

const ItemList = ({ search }) => {
  const [alcohol, setAlcohol] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:8080/list");
        console.log(res.data);
        setAlcohol(res.data.filter((x) => x.prod_name.includes(search) || x.user_id.includes(search)));
        console.log(alcohol);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [search]);

  // 대기 중일 때
  if (loading) {
    return <div />;
  }
  // 아직 값이 설정되지 않았을 때
  if (!alcohol) {
    return null;
  }
  if (alcohol.length < 1) {
    return (
      <div
        style={{
          width: "80%",
          margin: "0 auto",
          padding: "15% 10%",
          textAlign: "center",
        }}
      >
        검색 결과가 없습니다.
      </div>
    );
  }

  // 값이 유효할 때
  return <ProductCardCategory key={alcohol.prod_num} alcohol={alcohol} />;
};

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");
  console.log(search);
  return <ItemList search={search} />;
};

export default SearchPage;
