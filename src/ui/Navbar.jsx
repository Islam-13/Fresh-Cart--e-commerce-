import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

import useGetData from "../Hook/useGetData";
import { getProductsCart } from "../services/apiCart";
import { getWishlist } from "../services/apiProducts";
import logo from "../assets/images/freshcart-logo.svg";

function Navbar() {
  // const { name } = JSON.parse(localStorage.getItem("user"));
  const name = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).name
    : "";
  const { isLoggedIn, setIsLoggedIn } = useAuthContext();
  const { data, isLoading } = useGetData(getProductsCart, ["cart"], isLoggedIn);
  const { data: wishlistData, isLoading: wishlistLoading } = useGetData(
    getWishlist,
    ["wishlist"],
    isLoggedIn
  );

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem("myToken");
    localStorage.removeItem("user");
  }

  if (isLoading || wishlistLoading) return;

  const totalCartCount = data?.data?.products
    ?.map((prod) => prod.count)
    ?.reduce((curr, acc) => curr + acc, 0);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to=" ">
            <img src={logo} alt="fresh-cart logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse mt-4 mt-lg-0"
            id="navbarSupportedContent"
          >
            {isLoggedIn && (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="">
                    Home
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="products">
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="categories">
                    Categories
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="brands">
                    Brands
                  </NavLink>
                </li>
              </ul>
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {isLoggedIn ? (
                <>
                  <li className="nav-item dropdown position-relative">
                    <span className="d-none position-absolute user-account d-lg-block">
                      Hi {name}!
                    </span>
                    <Link
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      My Account
                    </Link>
                    <ul className="dropdown-menu w-25">
                      <li>
                        <Link className="dropdown-item" to="allorders">
                          <i className="fa-solid fa-list-check me-2"></i> Orders
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="addresses">
                          <i className="fa-solid fa-map-location-dot me-2"></i>{" "}
                          Addresses
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="profile">
                          <i className="fa-regular fa-user me-2"></i> Profile
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider mb-0" />
                      </li>
                      <li className="nav-item text-center opacity-75">
                        <Link
                          className="nav-link"
                          to="login"
                          onClick={handleLogout}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" to="wishlist">
                      Wishlist{" "}
                      <i className=" fa-regular fa-heart position-relative">
                        {wishlistData?.count > 0 && (
                          <span className="items-count">
                            {wishlistData?.count}
                          </span>
                        )}
                      </i>
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" to="cart">
                      Cart{" "}
                      <i className="fa-solid fa-cart-shopping position-relative">
                        {totalCartCount > 0 && (
                          <span className="items-count">{totalCartCount}</span>
                        )}
                      </i>
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link border rounded-3 me-2 width-fit p-2 mb-2 mb-lg-0"
                      to="login"
                    >
                      <i className="fa-solid fa-arrow-right-to-bracket"></i>{" "}
                      Login
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      className="nav-link border rounded-3 me-2 width-fit p-2"
                      to="register"
                    >
                      <i className="fa-solid fa-user-plus"></i> Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
