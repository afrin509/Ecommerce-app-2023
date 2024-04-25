import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { BsCart4 } from "react-icons/bs/index.js";
import { useAuth } from "../../context/auth.js";
import { ToastContainer, toast } from "react-toast";
import { useSearch } from "../../context/search.js";
import SearchInput from "../Form/SearchInput.js";
import useCategory from "../../hooks/useCategory.js";
import { useCart } from "../../context/cart.js";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart,setCart]=useCart();
  const categories = useCategory();
  const handleLogOut = () => {
    toast.success("Logged Out Successfully!!!!");

    setAuth({
      user: null,
      token: "",
    });
    console.log("inside handleLogOut");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* <ToastContainer position="top-left" /> */}

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01" style={{justifyContent:'space-between'}}>
        <Link className="navbar-brand" href="#">
          <BsCart4 fontSize={"2rem"} style={{ padding: "4px" }}></BsCart4>
          Ecommerce App
        </Link>
        <ul className="navbar-nav ml-auto mb-2 mb-lg-0 ">
          <li className="nav-item">
            <SearchInput />
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={"/Home"}>
              Home
            </NavLink>
          </li>
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to={"/categories"}
              data-bs-toggle="dropdown"
            >
              Categories
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to={"/categories"}>
                  All Categories
                </Link>
              </li>
              {categories?.map((c) => (
                <li>
                  <Link className="dropdown-item" to={`/category/${c.slug}`}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          

          {!auth.user ? (
            <Fragment>
              <li className="nav-item ">
                <NavLink className="nav-link" to={"/Register"}>
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"/login"}>
                  Login
                </NavLink>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <div className="dropdown">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="true"
                >
                  {auth?.user?.name}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={`/dashboard/${
                        auth?.user?.role === "admin" ? "admin" : "user"
                      }`}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/login"
                      onClick={handleLogOut}
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </div>
            </Fragment>
          )}

          <li className="nav-item ">
            <NavLink className="nav-link" to={"/Policy"}>
              Cart({cart.length})
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
