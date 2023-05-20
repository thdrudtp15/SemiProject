import f_logo from "../../assets/images/logo_font.png";
import "../../assets/styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="f-left">
        <img src={f_logo} alt=""></img>
      </div>
      <p>@copyright 막걸리마스터</p>
      <div className="f-right">
        <ul>
          <li>나해성</li>
          <li>박혜리</li>
          <li>송경세</li>
          <li>전채은</li>

          <li>조성빈</li>
          <li>조한식</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
