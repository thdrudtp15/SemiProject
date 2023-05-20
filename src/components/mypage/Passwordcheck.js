import React, { useState, navigate, useEffect } from "react";
import Input from "../common/Input";
import Checkbox from "../signup/Checkbox";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Passwordcheck = (props) => {
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "") {
      alert("비밀번호를 입력해주세요");
      return false;
    }

    axios
      .post("http://localhost:8080/usercheck", {
        user_id: window.sessionStorage.getItem("user_id"),
        user_pwd: password,
      })
      .then((res) => {
        let { data } = res;
        console.log(data);
        if (data === 1) {
          alert("비밀번호 확인이 완료되었습니다.");
          props.setActiveTab(5);
        } else {
          alert("비밀번호가 일치하지 않습니다.");
          setPassword("");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    console.log(password);
  };

  return (
    <div>
      <div class="header_box">
        <h3 className="header">개인정보 수정</h3>
      </div>
      <form type onSubmit={handleSubmit}>
        <div>
          <div style={{ height: "100px" }}></div>
          <Input
            label="비밀번호"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChangePassword}
            placeholder={"비밀번호를 입력해주세요"}
            text={"영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요."}
          />
        </div>

        <div className="button_box">
          <input type="button" onClick={handleSubmit} value="정보수정" className="button_summit" style={{ cursor: "pointer" }} />
        </div>
        <div style={{ height: "600px" }}></div>
      </form>
    </div>
  );
};

export default Passwordcheck;
