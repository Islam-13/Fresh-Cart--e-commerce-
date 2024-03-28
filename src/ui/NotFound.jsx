import { useNavigate } from "react-router-dom";
import NotFoundImage from "../assets/images/not-found.svg";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="contaier py-5 text-center">
      <img src={NotFoundImage} alt="" />
      <h4>We are sorry, but the page you are looking for cannot be found.</h4>

      <p>
        If you typed the URL directly, please make sure the spelling is correct.
      </p>

      <div>
        <button onClick={() => navigate(-1)} className="btn btn-warning">
          <i className="fa-solid fa-arrow-left mx-2"></i> go back
        </button>
        <button
          onClick={() => navigate("/")}
          className="btn btn-success mx-2 text-white"
        >
          move to homepage
        </button>
      </div>
    </div>
  );
}

export default NotFound;
