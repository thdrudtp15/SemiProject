import logo from "../assets/images/logo_soolpanda.png";
import "../assets/styles/join-success.css";
import { useNavigate, useLocation } from "react-router-dom";

const JoinSuccess = () => {
  const navigate = useNavigate();
  const { name } = useLocation();

  return (
    <div>
      <div className="success-wrap">
        <div className="success-image">
          <img src={logo} alt="Logo" />
          <h1>
            {name}님의 <br />
            주문이 완료되었습니다.
          </h1>
        </div>
        <div className="success-cont">
          <p>
            환영합니다! <br />
            이제부터 술판다의 서비스를 이용하실 수 있습니다.
          </p>
          <p>
            *회원가입 내역 확인 및 수정은 <span>마이페이지 &gt; 개인정보 수정</span> 에서 가능합니다.
          </p>
        </div>
        <div>
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인페이지
          </button>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            메인페이지
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinSuccess;

//일단 이페이지는 버리죠
