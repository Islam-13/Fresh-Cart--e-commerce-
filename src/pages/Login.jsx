import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

function Login() {
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    isValid,
    touched,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async () => {
      try {
        setIsLoading(true);
        setErrorMsg("");
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          values
        );
        localStorage.setItem("myToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setIsLoggedIn(true);
        if (window.location.pathname === "/login") {
          navigate("/");
        } else navigate(window.location.pathname);
      } catch (err) {
        setErrorMsg(err.response.data.message);
      }
      setIsLoading(false);
    },
    validationSchema,
  });

  return (
    <div className="w-75 m-auto my-5">
      <Helmet>
        <title>Fresh Cart | Login</title>
      </Helmet>
      <h1>Login Now :</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className="my-1">
          Email:
        </label>
        <input
          type="email"
          className="form-control mb-3"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && touched.email && (
          <p className="alert alert-danger">{errors.email}</p>
        )}

        <label htmlFor="password" className="my-1">
          Password:
        </label>
        <input
          type="password"
          className="form-control mb-3"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && touched.password && (
          <p className="alert alert-danger">{errors.password}</p>
        )}
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

        {isLoading ? (
          <button
            disabled
            type="button"
            className="btn bg-main px-3 text-white ms-auto d-block"
          >
            {" "}
            <i className="fas fa-spin fa-spinner px-3"></i>{" "}
          </button>
        ) : (
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/forget-password">Forget Password?</Link>
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="btn bg-main px-3 text-white ms-auto d-block"
            >
              Login
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
