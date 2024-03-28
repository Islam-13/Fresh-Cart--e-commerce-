import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../ui/Loader";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const baseURL = "https://ecommerce.routemisr.com/api/v1/";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function verifyEmail(email) {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${baseURL}auth/forgotPasswords`, {
        email,
      });
      data.statusMsg === "success" && navigate(`verify-code/${email}`);
    } catch (error) {
      toast.error("This email is not registered or correct");
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    verifyEmail(email);
  }

  if (isLoading) return <Loader />;

  return (
    <div className="container py-5 w-75">
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <h2>Find your account</h2>
      <h6 className="mb-3">
        Please enter your email to search for your account.
      </h6>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className=" form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="d-flex justify-content-end gap-3 mt-3 align-items-center">
          <button
            onClick={() => navigate("/login")}
            className="border rounded py-2 px-3"
          >
            cancel
          </button>
          <button className="btn btn-success">Continue</button>
        </div>
      </form>
    </div>
  );
}

export default ForgetPassword;
