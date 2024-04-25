import React, { useEffect, useState } from "react";
import Layout from "../comopnents/Layout/Layout.js";
import { useCart } from "../context/cart.js";
import { Checkbox, Select } from "antd";
import { useAuth } from "../context/auth.js";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Policy = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [cartProductIds, setCartProductIds] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const onChange = (e, product) => {
    const updatedCart = [...cart];
    const alreadyPresent = updatedCart.findIndex((c) => c._id === product._id);
    if (alreadyPresent != -1) {
      updatedCart[alreadyPresent]["checkout"] = e.target.checked;
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const AddtoCartHandler = (product) => {
    const updatedCart = [...cart];
    const alreadyPresent = updatedCart.findIndex((c) => c._id === product._id);
    if (alreadyPresent != -1) {
      updatedCart[alreadyPresent]["qty"] += 1;
      updatedCart[alreadyPresent]["checkout"] = true;
    } else {
      updatedCart.push({ ...product, qty: 1, checkout: true });
    }
    console.log("updatedCart", updatedCart);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/get-product"
      );
      console.log("i am setting products inside getall products");

      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let existingCart = localStorage.getItem("cart");
    if (existingCart) {
      setCart(JSON.parse(existingCart));
      setCartProductIds(JSON.parse(existingCart).map((product) => product._id));
    }

    getAllProducts();
  }, []);
  useEffect(() => {
    console.log("inside cart useeffect", cart);
    setTotalPrice(
      cart.reduce(
        (price, item) => price + (item.checkout ? item.price * item.qty : 0),
        0
      )
    );
    setTotalItems(
      cart.reduce((qnty, item) => {
        return qnty + (item.checkout ? item.qty : 0);
      }, 0)
    );
    setCartProductIds(cart.map((product) => product._id));
  }, [cart]);
  useEffect(() => {
    if (products.length > 0) {
      const updatedProducts = products.filter((product) => {
        return !cartProductIds.includes(product._id);
      });
      if (JSON.stringify(updatedProducts) !== JSON.stringify(products)) {
        setProducts([...updatedProducts]); // Create a new array with updated products
      }
    }
  }, [cartProductIds, products]);
  const quantityChangeHandler = (value, product) => {
    const updatedCart = [...cart];
    const alreadyPresent = updatedCart.findIndex((c) => c._id === product._id);
    if (alreadyPresent != -1) {
      console.log("value", value, typeof value);
      updatedCart[alreadyPresent]["qty"] = Number(value);
      updatedCart[alreadyPresent]["checkout"] = true;
    } else {
      updatedCart.push({ ...product, qty: Number(value), checkout: true });
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const SelectItemsHandler = (value) => {
    const updatedCart = [...cart];
    updatedCart.forEach((item) => (item.checkout = value));
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  console.log(
    "products",
    products,
    "totalItems",
    totalItems,
    "totalPrice",
    totalPrice,
    cartProductIds
  );
  const chunkWiseProducts = [];
  for (let i = 0; i < products.length; i += 3) {
    const chunk = products.slice(i, i + 3);
    chunkWiseProducts.push(chunk);
  }
  return (
    <Layout title={"Cart"}>
      {cart.length > 0 ? (
        <>
          <div className="row p-3">
            <div className="col-md-8">
              <h3 className="px-2 mb-0">Shopping Cart</h3>
              {totalItems > 0 ? (
                <button
                  type="button"
                  class="btn border-0"
                  onClick={() => SelectItemsHandler(false)}
                  style={{ color: "#007185" }}
                >
                  Deselect all items
                </button>
              ) : (
                <button
                  type="button"
                  class="btn border-0"
                  onClick={() => SelectItemsHandler(true)}
                  style={{ color: "#007185" }}
                >
                  Select all items
                </button>
              )}

              {cart.map((product, index) => {
                return (
                  <div
                    key={index}
                    className="card flex-row m-2 p-2 align-items-center"
                  >
                    <div className="col" style={{ flex: "0 0 auto" }}>
                      <Checkbox
                        className="m-2"
                        onChange={(e) => onChange(e, product)}
                        checked={product.checkout}
                      />
                    </div>
                    <div className="col-md-3 me-2">
                      <img
                        src={
                          "http://localhost:8080/api/v1/product/product-photo/" +
                          product._id
                        }
                        className="card-img-top"
                        alt={product.name}
                        style={{
                          height: "200px",
                          width: "200px",
                          display: "block",
                          margin: "auto",
                        }}
                      />
                    </div>
                    <div className="col">
                      <div className="container">
                        <div className="d-flex align-items-center justify-content-between">
                          <h5>{product.name}</h5>
                          <h5>$ {product.price}</h5>
                        </div>
                        <div className="col">
                          <p>{product.description}</p>
                          <p>Number of items :{product.quantity}</p>
                          <div className="d-flex">
                            <select
                              class="form-select"
                              variant="secondary"
                              aria-label="Default select example"
                              style={{ width: "100px" }}
                              onChange={(event) =>
                                quantityChangeHandler(
                                  event.target.value,
                                  product
                                )
                              }
                            >
                              <option value="1">Qty : 1</option>
                              <option value="2">Qty : 2</option>
                              <option value="3">Qty : 3</option>
                              <option value="4">Qty : 4</option>
                              <option value="5">Qty : 5</option>
                              <option value="6">Qty : 6</option>
                            </select>
                            <button type="button" class="btn btn-link">
                              Delete
                            </button>
                            <button type="button" class="btn btn-link">
                              Save for Later
                            </button>
                          </div>
                          <button type="button" class="btn btn-link">
                            Compare with Similar Items
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-md-4 mt-2 d-flex flex-column">
              <div
                className="d-flex flex-column"
                style={{ margin: "0px 10px" }}
              >
                Subtotal ( {totalItems} items ) : ${totalPrice}
                <button
                  type="button"
                  class="btn btn-warning mt-3"
                  style={{ width: "fit-content" }}
                >
                  Proceed to checkout
                </button>
              </div>
            </div>
          </div>
          <div className="row p-3">
            <h2 className="px-2 mb-0">Customers Who Bought Items in Your Recent History Also Bought</h2>

            <div id="carouselExample" className="carousel slide">
              <div className="carousel-inner">
                {chunkWiseProducts.map((chunk, i) => {
                  return (
                    <div className="carousel-item active">
                      <div className="d-flex">
                        {chunk.map((p, j) => {
                          return (
                            <Link
                              key={p._id}
                              to={`/dashboard/admin/product/${p.slug}`}
                              className="product-link"
                            >
                              <div
                                className="card m-2"
                                style={{ width: "18rem" }}
                              >
                                <img
                                  src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                                  className="card-img-top"
                                  width="100px"
                                  height="200px"
                                  alt={p.name}
                                />
                                {/* <img
                              width="100px"
                              height="200px"
                              src={`data:image/jpeg;base64,${Buffer.from(
                                p.photo.data,
                                "binary"
                              ).toString("base64")}`}
                              className="card-img-top"
                              alt={p.name}
                            /> */}
                                <div className="card-body">
                                  <div className="row">
                                    <div className="col-md-8">
                                      <h5 className="card-title">{p.name}</h5>
                                      <p className="card-text">
                                        {p.description}
                                      </p>
                                    </div>
                                    <div
                                      className="col-md-4"
                                      style={{ textAlign: "right" }}
                                    >
                                      ${Math.ceil(p.price)}
                                    </div>
                                  </div>
                                  <div className="row additional-info mt-2">
                                    <button
                                      type="button"
                                      class="btn btn-info"
                                      style={{ marginBottom: "10px" }}
                                      onClick={() => navigate("")}
                                    >
                                      More Details
                                    </button>
                                    <button
                                      class="btn btn-secondary"
                                      onClick={() => AddtoCartHandler(p)}
                                    >
                                      ADD TO CART
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
                {/* <div className="carousel-item active">
                <div className="d-flex">
                  <img
                    src="https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_640.jpg"
                    className="d-block w-50"
                    alt="..."
                  />
                  <img
                    src="https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_640.jpg"
                    className="d-block w-50"
                    alt="..."
                  />
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_640.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </div> */}
              </div>
              <button
                className="carousel-control-prev btn btn-primary"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="card flex-row m-2 p-5">
          <div>
            <img
              src="https://m.media-amazon.com/images/G/01/cart/empty/kettle-desaturated._CB445243794_.svg"
              width="270px"
              height="150px"
            />
          </div>
          <div className="ps-3">
            <h5>Your Afrin Cart is Empty </h5>
            <span className="text-gray">Show todays deals</span>
            {auth?.user ? (
              <></>
            ) : (
              <div className="d-flex">
                <button
                  type="button"
                  class="btn btn-warning mt-3"
                  style={{ width: "fit-content" }}
                >
                  Sign in to your account
                </button>

                <button
                  type="button"
                  class="btn  btn-outline-dark mt-3"
                  style={{ width: "fit-content", margin: "0 10px 0 10px" }}
                >
                  Sign up now
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Policy;
