import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../ui/Loader";
import { Helmet } from "react-helmet-async";

const baseURL = "https://ecommerce.routemisr.com/api/v1/";

function VerifyCode() {
  const { mail } = useParams();
  const [resetCode, setResetCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function verifyCode(resetCode) {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${baseURL}auth/verifyResetCode`, {
        resetCode,
      });
      data.status === "Success" && navigate(`/reset-password`);
    } catch (error) {
      toast.error("This code is not correct or expired");
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    verifyCode(resetCode);
  }

  if (isLoading) return <Loader />;

  return (
    <div className="container py-5 w-75">
      <Helmet>
        <title>Fresh Cart | Code Verification</title>
      </Helmet>
      <h2>Verification required</h2>
      <p>
        Please check your email for a message with your code. Your code is 6
        numbers long.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column mt-5 gap-4 flex-md-row">
          <input
            type="text"
            placeholder="Enter code"
            className="form-control d-block w-50"
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)}
          />
          <p className="text-md-center">We sent your code to: {mail}</p>
        </div>
        <div className="d-flex gap-3 mt-4 align-items-center">
          <button
            onClick={() => navigate("/login")}
            className="border rounded py-2 px-3"
          >
            cancel
          </button>
          <button className="btn btn-success">Verify</button>
        </div>
      </form>
    </div>
  );
}

export default VerifyCode;
