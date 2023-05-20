import { useState } from "react";
import axios from "axios";

function LikeButton() {
  const [liked, setLiked] = useState(false);
  axios
    .post("http://localhost:8080/like/islike", {
      user_id: "skgotjd",
      prod_id: "18",
    })
    .then((response) => {
      if (response.data === 1) {
        setLiked(true);
        console.log(liked);
      } else {
        setLiked(false);
        console.log(liked);
      }
    })
    .catch((e) => {
      console.error(e);
    });

  function handleLike() {
    setLiked(!liked);
    if (liked === false) {
      axios
        .post("http://localhost:8080/like/delete", {
          user_id: window.sessionStorage.getItem("user_id"),
          // prod_id: productData.prod_num,
        })
        .then((response) => {
          console.log("좋아요를 지웠슴다.");
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      axios
        .post("http://localhost:8080/like/insert", {
          user_id: window.sessionStorage.getItem("user_id"),
          // prod_id: productData.prod_num,
        })
        .then((response) => {
          console.log("좋아요를 눌렀슴다.");
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }

  return (
    <div className="like-button" onClick={handleLike}>
      <span className={liked ? "heart liked" : "heart"}>Like</span>
    </div>
  );
}

export default LikeButton;
