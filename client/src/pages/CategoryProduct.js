import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CategoryProductStyles.css";
import axios from "axios";
import Layout from "../comopnents/Layout/Layout.js";
import { useCart } from "../context/cart.js";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();
  console.log("cart", cart);
  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://ecommerce-app-2023-0ik6.onrender.com/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };
  const AddtoCartHandler = (product) => {
    const updatedCart = [...cart];
    const alreadyPresent = updatedCart.findIndex((c) => c._id === product._id);
    if (alreadyPresent != -1) {
      console.log("qty", updatedCart[alreadyPresent]["qty"]);
      updatedCart[alreadyPresent]["qty"] += 1;
      updatedCart[alreadyPresent]["checkout"] = true;
    } else {
      updatedCart.push({ ...product, qty: 1, checkout: true });
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  return loading ? (
    "Loading..."
  ) : (
    <Layout>
      <div className="container mt-3 category">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div className="card m-2" key={p._id}>
                  <img
                    src={`https://ecommerce-app-2023-0ik6.onrender.com/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title">{p.name}</h5>
                      <h5 className="card-title card-price">
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </h5>
                    </div>
                    <p className="card-text ">
                      {p.description.substring(0, 60)}...
                    </p>
                    <div className="card-name-price">
                      <button
                        className="btn btn-info ms-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button
                        class="btn btn-secondary"
                        onClick={() => AddtoCartHandler(p)}
                        style={{ width: "200px" }}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
