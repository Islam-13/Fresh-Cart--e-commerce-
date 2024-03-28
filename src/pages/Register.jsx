import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

function Register() {
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Min length must be 3 chracters")
      .max(20, "Max length must be 20 chracters"),
    email: Yup.string()
      .required("Email is required")
      .matches(
        /[a-z-_.0-9]{3,20}@[a-z]{2,8}\.[a-z]{2,3}$/,
        "Enter valid Email"
      ),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,13}$/,
        "Password must contain special character, number more than 8 characters and less than 15 characters"
      ),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "rePassword doesnt match"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Enter a valid number."),
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
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: async () => {
      try {
        setIsLoading(true);
        setErrorMsg("");
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signup",
          values
        );

        navigate("/login");
        return data;
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
        <title>Register</title>
      </Helmet>
      <h1>Register Now :</h1>
      <p>It’s quick and easy.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="my-1">
          Name:
        </label>
        <input
          type="text"
          className="form-control mb-3"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.name && touched.name && (
          <p className="alert alert-danger">{errors.name}</p>
        )}

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

        <label htmlFor="rePassword" className="my-1">
          RePassword:
        </label>
        <input
          type="password"
          className="form-control mb-3"
          id="rePassword"
          name="rePassword"
          value={values.repassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.rePassword && touched.rePassword && (
          <p className="alert alert-danger">{errors.rePassword}</p>
        )}

        <label htmlFor="phone" className="my-1">
          phone:
        </label>
        <input
          type="tel"
          className="form-control mb-3"
          id="phone"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.phone && touched.phone && (
          <p className="alert alert-danger">{errors.phone}</p>
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
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="btn bg-main px-3 text-white ms-auto d-block"
          >
            Register
          </button>
        )}
      </form>
    </div>
  );
}

export default Register;
