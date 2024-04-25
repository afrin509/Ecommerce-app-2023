import React, { useState, useEffect } from "react";
import { Buffer } from "buffer";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import AdminMenu from "../../comopnents/Layout/AdminMenu.js";
import Layout from "../../comopnents/Layout/Layout.js";
import { useCart } from "../../context/cart.js";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [imageSrc, setImageSrc] = useState([]);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  // useEffect(() => {
  //   // Assuming p.photo.data is a Uint8Array or ArrayBuffer
  //   const updateImageSources=[...imageSrc];

  //   products.map((p)=>{
  //   const arrayBuffer = p.photo.data;
  //   const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });

  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     updateImageSources.push(reader.result)
  //   };

  //   reader.readAsDataURL(blob);
  // })
  // setImageSrc(updateImageSources);

  // }, [products]);
  // useEffect(() => {
  //   const loadImageSources = async () => {
  //     const updateImageSources = [];

  //     await Promise.all(products.map(async (p) => {
  //       const arrayBuffer = p.photo.data.buffer;
  //       const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });

  //       const reader = new FileReader();

  //       // Wrap the reader.onloadend in a Promise
  //       const onLoadEnd = () => new Promise(resolve => {
  //         reader.onloadend = () => resolve(reader.result);
  //       });

  //       reader.readAsDataURL(blob);
  //       const result = await onLoadEnd();
  //       updateImageSources.push(result);
  //     }));

  //     setImageSrc(updateImageSources);
  //   };

  //   loadImageSources();
  // }, [products]);
  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/get-product"
      );
      console.log("products", data.products);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  console.log("all produccts", products);
  console.log("imagesrcs", imageSrc);
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
  return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p, index) => {
              return (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      width="100px"
                      height="200px"
                      alt={p.name}
                    />
                    {/* <img width="100px" height="200px" src={`data:image/jpeg;base64,${Buffer.from(p.photo.data,"binary").toString("base64")}`} className="card-img-top" alt={p.name}/> */}
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-8">
                          <h5 className="card-title">{p.name}</h5>
                          <p className="card-text">{p.description}</p>
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
                          style={{ margin: "0px 10px" }}
                          onClick={() => navigate("")}
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
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
