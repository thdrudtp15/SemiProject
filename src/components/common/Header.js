import styled from "styled-components";
import logo from "../../assets/images/logo_soolpanda.png";
import Categories from "./Categories";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../assets/styles/logo.css";

const Headerblock = styled.div`
  display: flex;
  padding: 0 10%;
  width: 80%;
  margin: 0 auto;
  position: sticky;
  left: 0px;
  top: 0px;
  z-index: 999;
  background: white;
`;

const SearchBox = styled.div`
  display: flex;
  height: 27px;
  margin: 0 auto;
  background: #ededed;
  padding: 5px 15px;
  width: 60%;
  border-radius: 20px;
`;

const Search = styled.input`
  border: 0;
  display: flex;
  height: 27px;
  margin: 0 10px;
  background: #ededed;
  padding: 0;
  width: 80%;
  &:focus {
    outline: none;
  }
`;
const SearchImg = styled.img`
height: 25px;
width: 25px;
&: hover {
  cursor: pointer;
`;

const Headercartegory = styled.div`
  display: flex;
  padding: 0 10%;
  width: 80%;
  margin: 0 auto;
  position: sticky;
  left: 0px;
  top: 80px;
  z-index: 999;
  background: white;
  border-bottom: 1px solid #e6e6e6;
`;

const Write = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 36px 10px 0 0;
  padding: 0;
  width: 95px;
  font-family: "Noto Sans KR";
  font-size: 0.95rem;
  font-weight: 500;
  text-align: center;
  background-color: white;
  border: 2px solid #bababa;
  border-radius: 20px;

  &: hover {
    cursor: pointer;
    background-color: #bababa;
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  width: 100%;
  padding: 5px 0;
  color: #2f2f2f;
  border-radius: 20px;
  transition: all 0.2s;

  &: hover {
    color: white;
    background-color: #bababa;
  }
`;

const Header = () => {
  const [searchItem, setSearchItem] = useState();
  const navigate = useNavigate();
  const onChange = (e) => {
    setSearchItem(e.target.value);
  };
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); //로그인 확인
  const handleLoad = () => {
    setLoaded(true);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      doSearch();
    }
  };
  const doSearch = () => {
    if (!searchItem) {
      alert("검색어를 입력해주세요!");
    } else {
      navigate(`/products?search=${searchItem}`);
    }
  };
  useEffect(() => {
    // 세션에 id 정보가 있는 경우 로그인 상태로 설정
    if (sessionStorage.getItem("user_id")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    // 로그아웃 버튼 클릭 시 세션에서 id 정보 삭제 후 로그아웃 상태로 설정
    sessionStorage.removeItem("user_id");
    setLoggedIn(false);
  };

  return (
    <>
      <Headerblock>
        <a href="/">
          <img
            src={logo}
            alt="Logo"
            style={{
              height: "55px",
              margin: "15px 0 7px 15px",
            }}
            className={`logo-image ${loaded ? "loaded" : ""}`}
            onLoad={() => setLoaded(true)}
          />
        </a>
        <div
          style={{
            margin: "0",
            width: "55vw",
            height: "48px",
            paddingTop: "32px",
          }}
        >
          <SearchBox>
            <SearchImg
              src="https://cdn4.iconfinder.com/data/icons/music-ui-solid-24px/24/search-3-512.png"
              alt=""
              onClick={doSearch}
            />
            <Search type="text" placeholder="찾으시는 제품이 있으신가요?" onChange={onChange} onKeyDown={handleKeyPress} />
          </SearchBox>
        </div>
        {/* 로그아웃*/}
        {loggedIn ? (
          <Write>
            <StyledLink to="/" onClick={handleLogout}>
              로그아웃
            </StyledLink>
          </Write>
        ) : (
          // 로그인
          <Write>
            <StyledLink to="/login">로그인</StyledLink>
          </Write>
        )}
        {/* 판매하기 */}
        {loggedIn && (
          <Write>
            <StyledLink to="/product/new">판매하기</StyledLink>
          </Write>
        )}
        {loggedIn && (
          <Write>
            <StyledLink to="/mypage">마이페이지</StyledLink>
          </Write>
        )}
      </Headerblock>
      <Headercartegory>
        <Categories />
      </Headercartegory>
    </>
  );
};

export default Header;
