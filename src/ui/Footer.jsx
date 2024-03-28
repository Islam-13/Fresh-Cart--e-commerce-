import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-main-light pt-4 pb-2">
      <div className="container">
        <h4>Get the Frech Cart App</h4>
        <p>
          We will send you a link, ioen it on your phone to download the app.
        </p>
        <div className="d-flex">
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control py-2"
              placeholder="Email..."
            />
          </div>
          <div className="col-sm-2 ps-3">
            <button className="btn w-100 bg-main text-white">
              Share App Link
            </button>
          </div>
        </div>

        <div className="line border-bottom border-2 my-3"></div>

        <div className="d-flex flex-column justify-content-between flex-lg-row gap-3">
          <div>
            <h3>We're Always Here To Help</h3>
            <p>Reach out to us through any of these support channels</p>
          </div>
          <div className="d-flex flex-column flex-md-row gap-2">
            <div className="d-flex align-items-center gap-2">
              <div className="icon">
                <i className="fa-regular fa-circle-question"></i>
              </div>
              <div>
                <h6>Help Center</h6>
                <h3>help.freshcart.com</h3>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div className="icon">
                <i className="fa-regular fa-envelope"></i>
              </div>
              <div>
                <h6>Email Support</h6>
                <h3>care@freshcart.com</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="line border-bottom border-2 my-2"></div>

        <div className=" d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div className="text-center">
            <p className=" text-uppercase mb-2">connect with us</p>

            <ul className="d-flex gap-3">
              <Link
                to="https://www.facebook.com"
                target="_blank"
                className="social-icon"
              >
                <li>
                  <i className="fa-regular fa-brands fa-facebook"></i>
                </li>
              </Link>

              <Link
                to="https://twitter.com"
                target="_blank"
                className="social-icon"
              >
                <li>
                  <i className="fa-regular fa-brands fa-twitter"></i>
                </li>
              </Link>

              <Link
                to="https://www.instagram.com"
                target="_blank"
                className="social-icon"
              >
                <li>
                  <i className="fa-regular fa-brands fa-instagram"></i>
                </li>
              </Link>

              <Link
                to="https://www.linkedin.com"
                target="_blank"
                className="social-icon"
              >
                <li>
                  <i className="fa-regular fa-brands fa-linkedin"></i>
                </li>
              </Link>
            </ul>
          </div>

          <div className="text-center">
            <p className=" text-uppercase mb-0">pay with</p>

            <ul className="d-flex gap-3 fs-1">
              <li>
                <i className="fa-brands fa-cc-visa bg-white text-main"></i>
              </li>
              <li>
                <i className="fa-brands fa-cc-mastercard bg-white text-main"></i>
              </li>
              <li>
                <i className="fa-brands fa-cc-stripe bg-white text-main"></i>
              </li>
              <li>
                <i className="fa-brands fa-cc-apple-pay bg-white text-main"></i>
              </li>
            </ul>
          </div>
        </div>

        <div className="line border-bottom border-2 mb-3"></div>

        <div className=" text-lg-center">
          <p>&copy; {year} Fresh Cart. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
