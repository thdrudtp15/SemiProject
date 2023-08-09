import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Checkbox from "../components/signup/Checkbox";
import "../assets/styles/signup.css";
import Input from "../components/common/Input";
import axios from "axios";

function SignupForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(false);
  const [phoneAd, setPhoneAd] = useState(false);
  const [emailAd, setEmailAd] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (window.confirm("입력하신 정보가 맞습니까?")) {
      axios
        .post("http://localhost:8080/Memberjoin", {
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
          let { data } = res;
          if (data === 1) {
            console.log("회원가입 성공");
            alert("회원가입성공");
            navigate("/joinsuccess", {
              replace: true,
              state: { value: name },
            });
            window.location.reload();
            //sessionStorage.setitem("user_id", id);
          } else {
            console.log("회원가입실패");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const [idMessage, setIdMessage] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState(false);
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState(false);
  const [emailMessage, setEmailMessage] = useState(false);
  const [phoneMessage, setPhoneMessage] = useState(false);
  const [nameMessage, setNameMessage] = useState(false);
  const [codeMessage, setCodeMessage] = useState(false);

  const [isId, setIsId] = useState(false);
  const [isId2, setIsId2] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isEmail2, setIsEmail2] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [idcheck, setIdcheck] = useState(false);
  const [emailcheck, setEmailcheck] = useState(false);

  const DuplicateCheck = () => {
    if (id === "") {
      alert("아이디를 입력해주세요");
      return false;
    }
    if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(id)) {
      alert("아이디에는 한글을 사용할 수 없습니다.");
      setId("");
      return false;
    }

    axios
      .post("http://localhost:8080/DuplicateCheck", { user_id: id })
      .then((res) => {
        if (res.data === 1) {
          alert("중복되는 아이디가 존재합니다.");
          setIdcheck(false);
          setIsId2(false);
          setId("");
        } else {
          alert("사용가능한 아이디입니다.");
          setIdcheck(true);
          setIsId2(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //================================================
  const DuplicateEmailCheck = () => {
    if (id === "") {
      alert("아이디를 입력해주세요");
      return false;
    }

    axios
      .post("http://localhost:8080/DuplicateEmailCheck", { user_email: email })
      .then((res) => {
        if (res.data === 1) {
          alert("중복되는 이메일이 존재합니다.");
          setEmailcheck(false);
          setIsEmail2(false);
          setEmail("");
        } else {
          alert("사용가능한 이메일입니다.");
          setEmailcheck(true);
          setIsEmail2(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //==============================================================

  const onChangeId = (e) => {
    setIdMessage(true);
    const currentId = e.target.value;
    setId(currentId);
    const idRegExp = /^[a-zA-z0-9]{6,12}$/;
    if (!idRegExp.test(currentId)) {
      setIsId(false);
    } else {
      setIsId(true);
    }
  };
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

  const onChangeName = (e) => {
    setNameMessage(true);
    const currentName = e.target.value;
    setName(currentName);
    const nameRegExp = /^[가-힣]{2,5}$/;
    if (!nameRegExp.test(currentName)) {
      setIsName(false);
    } else {
      setIsName(true);
    }
  };

  const onChangeCode = (e) => {
    setCodeMessage(true);
    const inputCode = e.target.value.replace(/-/g, "");
    if (inputCode.length > 13) {
      return;
    }
    let formattedCode = "";
    for (let i = 0; i < inputCode.length; i++) {
      if (i === 6) {
        formattedCode += "-";
      }
      formattedCode += inputCode.charAt(i);
    }
    setCode(formattedCode);
    const codeRegExp = /\d{2}([0]\d|[1][0-2])([0][1-9]|[1-2]\d|[3][0-1])[-]*[1-4]\d{6}/g;
    if (!codeRegExp.test(inputCode)) {
      setIsCode(false);
    } else {
      setIsCode(true);
    }
  };

  const onChangeEmail = (e) => {
    setEmailMessage(true);
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
    setPhoneMessage(true);
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
    <div className="register_form_box">
      <h2 className="header">회원 가입</h2>
      <form onSubmit={handleSubmit}>
        <div
          className={`id_box${idMessage ? (isId ? " valid" : " invalid") : ""} id_box${
            idMessage ? (isId2 ? " valid" : " invalid") : ""
          }`}
        >
          <Input
            label="아이디"
            type="text"
            id="id"
            name="id"
            value={id}
            onChange={onChangeId}
            placeholder={"아이디를 입력해주세요"}
          />
          {idMessage && (
            <div className={`message${isId ? "_hidden" : "_visible"}`}>6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합</div>
          )}
          <br />
          <br />
          <input type="button" onClick={DuplicateCheck} value="중복확인" style={{ cursor: "pointer", borderBottom: "1px" }} />
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
        <div className={`name_box${nameMessage ? (isName ? " valid" : " invalid") : ""}`}>
          <Input
            label="이름"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onChangeName}
            placeholder={"이름을 입력해주세요"}
          />
          {nameMessage && <div className={`message${isName ? "_hidden" : "_visible"}`}>올바른 이름을 입력</div>}
        </div>
        <div className={`code_box${codeMessage ? (isCode ? " valid" : " invalid") : ""}`}>
          <Input
            label="주민등록번호"
            type="text"
            id="code"
            name="code"
            value={code}
            onChange={onChangeCode}
            placeholder={"앞 6자리 - 뒤 7자리"}
          />
          {codeMessage && <div className={`message${isCode ? "_hidden" : "_visible"}`}>올바른 주민등록번호를 입력하세요!</div>}
        </div>
        <div
          className={`email_box${emailMessage ? (isEmail ? " valid" : " invalid") : ""} id_box${
            emailMessage ? (isEmail2 ? " valid" : " invalid") : ""
          }`}
        >
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
          <br />
          <br />
          <input
            type="button"
            onClick={DuplicateEmailCheck}
            value="중복확인"
            style={{ cursor: "pointer", borderBottom: "1px" }}
          />
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
          <Checkbox checked={service} onChange={setService}>
            <span>서비스 이용약관 (필수)</span>
          </Checkbox>
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
            disabled={
              !service ||
              !isId ||
              !isPassword ||
              !isPasswordConfirm ||
              !isEmail ||
              !isPhone ||
              !isCode ||
              !isName ||
              !idcheck ||
              !emailcheck
            }
          >
            가입하기
          </button>
        </div>
      </form>
    </div>
  );
}
export default SignupForm;
