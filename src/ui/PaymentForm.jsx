import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

function CashPaymentForm({ id, onCloseModal, fnc, loadfunc }) {
  const validationSchema = Yup.object({
    details: Yup.string().required("Details is required."),
    city: Yup.string().required("City is required."),
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
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: () => fnc({ id, values }),
    validationSchema,
  });

  return (
    <div className="border py-4 px-5 rounded-4 bg-white shadow">
      <h1>Adress :</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="details" className="my-1">
          Details:
        </label>
        <input
          type="text"
          className="form-control mb-3"
          id="details"
          name="details"
          value={values.details}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.details && touched.details && (
          <p className="alert alert-danger">{errors.details}</p>
        )}

        <label htmlFor="city" className="my-1">
          City:
        </label>
        <input
          type="text"
          className="form-control mb-3"
          id="city"
          name="city"
          value={values.city}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {errors.city && touched.city && (
          <p className="alert alert-danger">{errors.city}</p>
        )}

        <label htmlFor="phone" className="my-1">
          Phone:
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

        {loadfunc ? (
          <button
            disabled
            type="button"
            className="btn bg-main px-3 text-white ms-auto d-block"
          >
            <i className="fas fa-spin fa-spinner px-3"></i>
          </button>
        ) : (
          <div className="d-flex justify-content-end gap-3">
            <button onClick={onCloseModal} className="btn border">
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid || loadfunc}
              className="btn bg-main px-3 text-white"
            >
              Place Order
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default CashPaymentForm;
