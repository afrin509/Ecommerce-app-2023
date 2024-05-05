import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../comopnents/Layout/Layout.js";
import { useCart } from "../context/cart.js";
const ProductDetailsPage = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [similarProducts, setSimilarProducts] = useState();
  const getProductDetails = async () => {
    const { data } = await axios.get(
      `https://ecommerce-app-2023-0ik6.onrender.com/api/v1/product/get-product/${
        location.pathname.split("/")[2]
      }`
    );
    setLoading(false);
    // console.log("data", data, data.singleProduct);
    setProduct(data.singleProduct);
  };
  const getOtherProductsFromCategory = async () => {
    const { data } = await axios.get(
      `https://ecommerce-app-2023-0ik6.onrender.com/api/v1/product/related-products/${product.category._id}/${product._id}`
    );
    console.log("data category", data);

    setSimilarProducts(data.products);
  };
  useEffect(() => {
    if (product) getOtherProductsFromCategory();
  }, [product]);
  useEffect(() => {
    getProductDetails();
  }, []);
  const AddtoCartHandler = (product) => {
    const updatedCart = [...cart];
    const alreadyPresent = updatedCart.findIndex((c) => c._id === product._id);
    if (alreadyPresent != -1) {
      updatedCart[alreadyPresent]["qty"] += 1;
      updatedCart[alreadyPresent]["checkout"] = true;
    } else {
      updatedCart.push({ ...product, qty: 1, checkout: true });
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  console.log("product", product, "similarProducts", similarProducts);
  return (
    <Layout title={"Product Details - Ecommerce"}>
      <div
        style={{
          backgroundColor: "#fff",
          backgroundClip: "border-box",
          border: "1px solid rgba(0, 0, 0, .125)",
          borderRadius: "0.25rem",
        }}
      >
        {!loading ? (
          <>
            <div className="row container product-details m-4">
              <div className="col-md-6">
                <img
                  src={`https://ecommerce-app-2023-0ik6.onrender.com/api/v1/product/product-photo/${product._id}`}
                  className="card-img-top"
                  alt={product.name}
                  style={{
                    height: "250px",
                    width: "400px",
                    display: "block",
                    margin: "auto",
                  }}
                  // width="250px"
                  height="250px"
                />
              </div>
              <div className="col-md-6 product-details-info d-flex flex-column justify-content-around">
                <h4>Product Details</h4>
                <hr />
                <h6>Name : {product.name}</h6>
                <h6>Description : {product.description}</h6>
                <h6>
                  Price :
                  {product?.price?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </h6>
                <h6>Category : {product?.category?.name}</h6>
                <button
                  class="btn btn-secondary"
                  onClick={() => AddtoCartHandler(product)}
                  style={{ width: "200px" }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
            <h5 style={{ padding: "15px 0px 0px 16px" }}>Similar Products</h5>
            <div className="row container pl-4">
              <div className="d-flex">
                {similarProducts &&
                  (similarProducts.length == 0 ? (
                    <div className="card m-2 p-2 text-center">
                      No Similar Products
                    </div>
                  ) : (
                    similarProducts.map((p) => {
                      return (
                        <div className="card m-2" style={{ width: "18rem" }}>
                          <img
                            src={`https://ecommerce-app-2023-0ik6.onrender.com/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            width="100px"
                            height="150px"
                            alt={p.name}
                          />
                          {/* <img width="100px" height="200px" src={`data:image/jpeg;base64,${Buffer.from(p.photo.data,"binary").toString("base64")}`} className="card-img-top" alt={p.name}/> */}
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-8">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">
                                  {p.description.substring(0, 70)}
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
                                onClick={() => navigate("")}
                              >
                                More Details
                              </button>
                              <button
                                class="btn btn-secondary"
                                onClick={() => AddtoCartHandler(product)}
                                style={{ width: "200px" }}
                              >
                                ADD TO CART
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ))}
              </div>
            </div>
          </>
        ) : (
          "Loading ... "
        )}
      </div>
    </Layout>
  );
};

export default ProductDetailsPage;
