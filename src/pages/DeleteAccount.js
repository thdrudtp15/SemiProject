import logo from "../assets/images/logo_soolpanda.png";
import "../assets/styles/join-success.css";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="success-wrap">
        <div className="success-image">
          <img src={logo} alt="Logo" />
          <h1>
            아쉬워요! <br />
            그동안 이용해주셔서 감사합니다(_ _)
          </h1>
        </div>
        <div className="success-cont">
          <p>
            안녕은 영원한 헤어짐은 아니겠지요?
            <br />
          </p>
        </div>
        <div>
          <button
            onClick={() => {
              navigate("/");
              window.location.reload();
            }}
          >
            메인페이지
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
