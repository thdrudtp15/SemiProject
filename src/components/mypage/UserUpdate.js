import React, { useState, navigate, useEffect } from "react";
import Input from "../common/Input";
import Checkbox from "../signup/Checkbox";
import axios from "axios";

const UserUpdate = (props) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneAd, setPhoneAd] = useState(false);
  const [emailAd, setEmailAd] = useState(false);
  // useEffect(() => {
  //   const userId = sessionStorage.getItem("user_id");
  //   console.log(userId);                               //
  //   axios
  //     .get(`http://localhost:8080/find/user?user_id=${userId}`)
  //     .then((res) => {
  //       const { data } = res;
  //       console.log(userId);
  //       console.log(data);
  //       setId(data.user_id);
  //       setEmail(data.user_email);
  //       setPhone(data.user_tel);
  //       setPhoneAd(data.user_sns_push_yn);
  //       setEmailAd(data.user_email_push_yn);
  //       setIsPhone(true);
  //       setIsEmail(true);
  //       setEmailMessage(true);
  //       setPhoneMessage(true);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, []);
  useEffect(() => {
    selectUser();
  }, []);

  const selectUser = () => {
    //회원 데이터 불러오는 함수
    axios
      .post("http://localhost:8080/selectuser", {
        user_id: window.sessionStorage.getItem("user_id"),
      })
      .then((res) => {
        let { data } = res;
        setId(data.user_id);
        setName(data.user_name);
        setCode(data.user_code);
        setEmail(data.user_email);
        setPhone(data.user_tel);
        setPhoneAd(data.user_sns_push_yn);
        setEmailAd(data.user_email_push_yn);
        setIsEmail(true);
        setIsPhone(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // const handleSubmit = () => {
  //   const user = {
  //     user_id: id,
  //     user_pwd: password,
  //     user_tel: phone,
  //     user_email: email,
  //     user_sns_push_yn: phoneAd,
  //     user_email_push_yn: emailAd,
  //   };
  //   console.log(user);
  //   axios
  //     .post("http://localhost:8080/user/update", user, { headers: { "Content-Type": "application/json" } })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  const handleSubmit = () => {
    const id = window.sessionStorage.getItem("user_id");
    console.log(id);
    axios
      .post("http://localhost:8080/updateuser", {
        user_id: id,
        user_pwd: password,
        user_name: name,
        user_code: code,
        user_tel: phone,
        user_email: email,
        user_sns_push_yn: phoneAd,
        user_email_push_yn: emailAd,
      })
      .then((res) => {
        console.log(res);
        const { data } = res;
        if (data === 1) {
          alert("회원정보 수정 성공");
          props.setActiveTab(0);
          navigate("/mypage");
        } else {
          console.log("왜 안되누");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleDeleteButton = () => {
    if (window.confirm("정말 삭제 하실 건가요?")) {
      const id = window.sessionStorage.getItem("user_id");
      axios
        .post(`http://localhost:8080/deleteuser`, {
          user_id: id,
        })
        .then((res) => {
          window.sessionStorage.removeItem("user_id");
          console.log(window.sessionStorage.getItem("user_id"));
          window.location.href = "/deleteaccount";
        })
        .catch((error) => {
          alert("회원 탈퇴 도중 오류가 발생하였습니다.");
        });
    }
  };

  const [passwordMessage, setPasswordMessage] = useState(false);
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState(false);
  const [emailMessage, setEmailMessage] = useState(false);
  const [phoneMessage, setPhoneMessage] = useState(false);

  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPhone, setIsPhone] = useState(false);

  const onChangePassword = (e) => {
    setPasswordMessage(true);
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setIsPassword(false);
    } else {
      setIsPassword(true);
    }
  };

  const onChangePasswordConfirm = (e) => {
    setPasswordConfirmMessage(true);
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);
    if (password !== currentPasswordConfirm) {
      setIsPasswordConfirm(false);
    } else {
      setIsPasswordConfirm(true);
    }
  };

  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
    if (!emailRegExp.test(currentEmail)) {
      setIsEmail(false);
    } else {
      setIsEmail(true);
    }
  };

  const onChangePhone = (e) => {
    let inputPhone = e.target.value.replace(/-/g, "");
    if (inputPhone.length > 11) {
      return;
    } else if (inputPhone.length === 11) {
      let a = inputPhone.substr(0, 3);
      let b = inputPhone.substr(3, 4);
      let c = inputPhone.substr(7, 4);
      inputPhone = a + "-" + b + "-" + c;
    }
    setPhone(inputPhone);
    const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if (!phoneRegExp.test(inputPhone)) {
      setIsPhone(false);
    } else {
      setIsPhone(true);
    }
  };

  return (
    <div>
      <div className="header_box">
        <h3 className="header">개인정보 수정</h3>
      </div>
      <form>
        <div className="id_box">
          <Input
            label="아이디"
            type="text"
            id="id"
            name="id"
            value={id}
            placeholder={"아이디를 입력해주세요"}
            disabled
            readOnly
          />
        </div>
        <div className={`password_box${passwordMessage ? (isPassword ? " valid" : " invalid") : ""}`}>
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
          {passwordMessage && (
            <div className={`message${isPassword ? "_hidden" : "_visible"}`}>영어, 숫자, 특수문자를 혼합하여 8자리 이상</div>
          )}
        </div>
        <div className={`passwordConfirm_box${passwordConfirmMessage ? (isPasswordConfirm ? " valid" : " invalid") : ""}`}>
          <Input
            label="비밀번호 확인"
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={onChangePasswordConfirm}
            placeholder={"비밀번호를 한번 더 입력해주세요"}
          />
          {passwordConfirmMessage && (
            <div className={`message${isPasswordConfirm ? "_hidden" : "_visible"}`}>비밀번호가 불일치</div>
          )}
        </div>

        <div className={`email_box${emailMessage ? (isEmail ? " valid" : " invalid") : ""}`}>
          <Input
            label="이메일"
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={onChangeEmail}
            placeholder={"예) panda@soolpanda.com"}
          />
          {emailMessage && <div className={`message${isEmail ? "_hidden" : "_visible"}`}>올바른 이메일 형식을 입력하세요!</div>}
        </div>
        <div className={`phone_box${phoneMessage ? (isPhone ? " valid" : " invalid") : ""}`}>
          <Input
            label="휴대폰 번호"
            type="text"
            id="phone"
            name="phone"
            value={phone}
            onChange={onChangePhone}
            placeholder={"- 빼고 입력해주세요."}
          />
          {phoneMessage && <div className={`message${isPhone ? "_hidden" : "_visible"}`}>올바른 휴대전화 번호를 입력하세요!</div>}
        </div>
        <div className="check_box">
          <Checkbox checked={phoneAd} onChange={setPhoneAd}>
            <span>휴대폰 마케팅 수신 (선택)</span>
          </Checkbox>
          <Checkbox checked={emailAd} onChange={setEmailAd}>
            <span>이메일마케팅 수신 (선택)</span>
          </Checkbox>
        </div>
        <div className="button_box">
          <button
            className="button_summit"
            type="button"
            disabled={!isPassword || !isPasswordConfirm || !isEmail || !isPhone}
            onClick={handleSubmit}
          >
            정보 수정
          </button>
        </div>
        <div>
          <button className="button_delete_submit" type="button" onClick={handleDeleteButton}>
            회원 탈퇴하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserUpdate;
