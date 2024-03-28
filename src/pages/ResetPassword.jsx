import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import axios from "axios";
import * as Yup from "yup";
import { useAuthContext } from "../context/AuthContext";
import Loader from "../ui/Loader";
import { useFormik } from "formik";

const baseURL = "https://ecommerce.routemisr.com/api/v1/";

function ResetPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLoggedIn } = useAuthContext();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .matches(
        /[a-z-_.0-9]{3,20}@[a-z]{2,8}\.[a-z]{2,3}$/,
        "Enter valid Email"
      ),
    newPassword: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,13}$/,
        "Password must contain special character, number more than 8 characters and less than 15 characters"
      ),
  });

  const {
    values,
    errors,
    isValid,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.put(
          `${baseURL}auth/resetPassword`,
          values
        );

        if (data.token) {
          localStorage.setItem("myToken", data.token);
          setIsLoggedIn(true);
          navigate("/");
        }
      } catch (error) {
        toast.error("Email or new password is not vaild");
        throw new Error(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema,
  });

  if (isLoading) return <Loader />;

  return (
    <div className="container py-5 w-75">
      <Helmet>
        <title>Fresh Cart | Reset Password</title>
      </Helmet>
      <h2 className="text-center">reset your account password</h2>

      <form className="mt-3 py-2 px-4" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="form-control mb-3"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && touched.email && (
          <p className="alert alert-danger">{errors.email}</p>
        )}

        <input
          type="password"
          id="password"
          name="newPassword"
          placeholder="New password"
          className="form-control mb-3"
          value={values.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.newPassword && touched.newPassword && (
          <p className="alert alert-danger">{errors.newPassword}</p>
        )}

        <div className="d-flex gap-3 mt-4 align-items-center justify-content-end">
          <button
            type="reset"
            onClick={() => navigate("/login")}
            className="border rounded py-2 px-3"
          >
            cancel
          </button>
          <button type="submit" disabled={!isValid} className="btn btn-success">
            Save changes and log in
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
