import WishCard from "./WishCard";
import { useEffect, useState } from "react";
import axios from "axios";

const WishList = () => {
  const [prod_nums, setProdNums] = useState([]);
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

  return (
    <>
      <div className="header_box">
        <h3 className="header">위시 리스트</h3>
      </div>
      <div className="wish_list_box">
        <WishCard />
      </div>
    </>
  );
};

export default WishList;
