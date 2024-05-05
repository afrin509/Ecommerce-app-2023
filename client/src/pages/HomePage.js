import React, { useEffect, useState } from "react";
import Layout from "../comopnents/Layout/Layout.js";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Prices } from "../comopnents/Price.js";
import "../styles/HomePage.css";
import { useSearch } from "../context/search.js";
import { useCart } from "../context/cart.js";
import { scrapeAndStoreProduct } from "../utils/amazonscrapping.js";
const HomePage = () => {
  // const [auth, setAuth] = useAuth();
  const { search, setSearch, submit } = useSearch();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filtereredProducts, setFilteredProducts] = useState([]);
  const [filteredPrice, setFilteredPrice] = useState([]);
  const [pageCount, setpageCount] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(2);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-app-2023-0ik6.onrender.com/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const isValidAmazonProductURL = (url) => {
    try {
      const parsedURL = new URL(url);
      const hostname = parsedURL.hostname;

      if (
        hostname.includes("amazon.com") ||
        hostname.includes("amazon.") ||
        hostname.endsWith("amazon")
      ) {
        return true;
      }
    } catch (error) {
      return false;
    }

    return false;
  };
  // const getAllProducts = async () => {
  //   try {
  //     setLoading(true);
  //     const { data } = await axios.post(
  //       `https://ecommerce-app-2023-0ik6.onrender.com/api/v1/product/product-list/${pageNumber}`,
  //       { productsPerPage }
  //     );
  //     console.log("data", data);
  //     setLoading(false);

  //     setProducts(data.products);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  // };
  const getCountAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-app-2023-0ik6.onrender.com/api/v1/product/product-count"
      );
      setpageCount(Math.ceil(data?.total / productsPerPage));
    } catch (error) {
      console.log(error);
    }
  };
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-app-2023-0ik6.onrender.com/api/v1/product/get-product"
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
    getAllProducts();
    getProductsBasedOnPage();
    getCountAllProducts();
  }, []);
  const handleFilterCategory = (event, categoryId) => {
    let a = [...filteredCategories];

    if (event.currentTarget.checked) {
      a.push(categoryId);
      setFilteredCategories(a);
    } else {
      a = a.filter((category) => category != categoryId);
      setFilteredCategories(a);
    }
  };
  const handleFilterPrice = (e, price) => {
    setFilteredPrice(price.array);
  };
  const ScrapAmazonProduct = async () => {
    // const isValidLink = isValidAmazonProductURL(search);

    // if (!isValidLink) return alert("Please provide a valid Amazon link");

    try {
      // setIsLoading(true);
      // axios.get(`https://www.amazon.in/s?k=${search}`);
      // Scrape the product page
      // const product = await scrapeAndStoreProduct(
      //   `https://www.amazon.in/s?k=${search}`
      // );
      // console.log('amazon scrapped products',product);
    } catch (error) {
      console.log(error);
    } finally {
      // setIsLoading(false);
    }
  };
  // const filterProduct = () => {
  //   let updatedFilteredProducts = [...products];
  //   updatedFilteredProducts = updatedFilteredProducts.filter((product) =>
  //     filteredCategories.includes(product._id)
  //   );
  //   setFilteredProducts(updatedFilteredProducts);
  // };
  useEffect(() => {
    // let updatedFilteredProducts = [...products];
    // updatedFilteredProducts = updatedFilteredProducts.filter((product) =>
    //   filteredCategories.includes(product._id)
    // );
    // setFilteredProducts(updatedFilteredProducts);

    if (filteredCategories.length || filteredPrice.length || submit)
      filterProduct();

    if (submit) {
      ScrapAmazonProduct();
    }
  }, [filteredCategories, filteredPrice, search, submit]);
  const getProductsFromSearchInput = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://ecommerce-app-2023-0ik6.onrender.com/api/v1/product/search-product",
        { search }
      );
      setLoading(false);
      setProducts(data?.products);
      setPageNumber(1);
      setpageCount(Math.ceil(data?.products.length / productsPerPage));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  // useEffect(() => {
  //   setFilteredProducts(products);
  // }, [products]);
  // useEffect(() => {
  //   if (submit) filterProduct();
  // }, [search, submit]);
  // useEffect(() => {
  //   getProductsBasedOnPage(pageNumber);
  // }, [pageCount]);
  useEffect(() => {
    setpageCount(Math.ceil(products.length / productsPerPage));
    getProductsBasedOnPage(1);
  }, [products]);
  const filterProduct = async () => {
    try {
      // // setLoading(true);
      // if (filteredCategories.length == 0 && filteredPrice.length != 0) {
      //   setFilteredCategories(categories.map((category) => category._id));
      // }
      // if (filteredCategories.length != 0 && filteredPrice.length == 0) {
      //   setFilteredPrice([0, 1000]);
      // }
      // console.log("abc", filteredCategories, filteredPrice);
      // let x = products.filter((product) => {
      //   return (
      //     filteredCategories.includes(product.category) &&
      //     product.price >= filteredPrice[0] &&
      //     product.price <= filteredPrice[1]
      //   );
      // });
      const { data } = await axios.post(
        "https://ecommerce-app-2023-0ik6.onrender.com/api/v1/product/filter-products",
        {
          filteredCategories,
          filteredPrice,
          search,
        }
      );
      console.log("filtered products", data.products);
      if (data?.success) {
        setLoading(false);
        setProducts(data.products);
      }
      // setProducts(x);
      // let y = x.filter((product, index) => {
      //   return (
      //     index + 1 > (pageNumber - 1) * productsPerPage &&
      //     index + 1 <= pageNumber * productsPerPage
      //   );
      // });
      // console.log("filtered products", x);
      // setFilteredProducts(y);
      // setpageCount(Math.ceil(x.length / productsPerPage));
    } catch (err) {
      setLoading(false);
      console.log("error while getting filtered products", err);
    }
  };

  const getProductsBasedOnPage = (updatedIndex) => {
    // console.log("index inside fn", index);
    // try {
    //   setLoading(true);
    //   setPageNumber(index);
    //   const { data } = await axios.post(
    //     `https://ecommerce-app-2023-0ik6.onrender.com/api/v1/product/product-list/${pageNumber}`,
    //     { productsPerPage }
    //   );
    //   if (data.success) {
    //     setProducts(data.products);
    //     setLoading(false);
    //   }
    // } catch (error) {
    //   console.log(
    //     "error while getting product list based on page number",
    //     error
    //   );
    //   setLoading(false);
    // }
    setPageNumber(updatedIndex);
    let x = products.filter((product, index) => {
      return (
        index + 1 > (updatedIndex - 1) * productsPerPage &&
        index + 1 <= updatedIndex * productsPerPage
      );
    });
    console.log("filtered products", x);
    setFilteredProducts(x);
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
  console.log("page-count", pageCount, "pageNumber", pageNumber);
  return loading ? (
    "Loading..."
  ) : (
    <Layout title={"All Products - Best Offers "}>
      <div className="container-fluid row mt-3 home-page">
        <div className="col-3 pl-4">
          <h4 className="text-left mb-4">Filter By Category</h4>

          {categories.map((category, index) => {
            return (
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id={`${category.name}-${index}`}
                  onChange={(e) => handleFilterCategory(e, category._id)}
                />
                <label
                  class="form-check-label"
                  for={`${category.name}-${index}`}
                >
                  {category.name}
                </label>
              </div>
            );
          })}
          <h4 className="text-left mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            {Prices.map((price, index) => {
              return (
                <div className="form-check">
                  <input
                    className="form-check-input"
                    name="price-range"
                    type="radio"
                    value=""
                    id={`${price.name}-${index}`}
                    onChange={(e) => handleFilterPrice(e, price)}
                  />
                  <label
                    className="form-check-label"
                    for={`${price.name}-${index}`}
                  >
                    {price.name}
                  </label>
                </div>
              );
            })}
          </div>
          <div className="d-flex flex-column p-3">
            <button
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="col-9">
          <h4 className="text-center">All Products</h4>
          <div className="d-flex flex-wrap">
            {filtereredProducts?.map((p, index) => {
              return (
                <div className="card m-2" style={{ width: "23rem" }}>
                  <img
                    src={`https://ecommerce-app-2023-0ik6.onrender.com/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100px"
                    height="200px"
                  />
                  {/* `data:image/jpeg;base64,${Buffer.from(p.photo.data,"binary").toString("base64")}` */}
                  {/* <img width="100px" height="200px" src={p.photo} className="card-img-top" alt={p.name}/> */}
                  <div className="card-body">
                    <div className="row mb-2">
                      <div className="col-md-8">
                        <h5 className="card-title mb-2">{p.name}</h5>
                        <p className="card-text">{p.description}</p>
                      </div>
                      <div
                        className="col-md-4 text-right"
                        style={{ fontWeight: "bold", textAlign: "right" }}
                      >
                        ${Math.ceil(p.price)}
                      </div>
                    </div>
                    <div
                      className="d-flex justify-content-between mt-2"
                      style={{ gap: "12px" }}
                    >
                      {/* for blue color */}
                      <button
                        className="btn btn-info btn-small"
                        onClick={() => {
                          console.log("onclick");
                          navigate(`/product/${p.slug}`);
                        }}
                        style={{ color: "white", width: "160px" }}
                      >
                        More Details
                      </button>
                      <button
                        class="btn btn-secondary"
                        onClick={() => AddtoCartHandler(p)}
                        style={{ width: "160px" }}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {pageCount > 1 && (
            <div className="d-flex justify-content-center">
              <nav aria-label="...">
                <ul className="pagination">
                  <li
                    className={`page-item ${pageNumber == 1 ? "disabled" : ""}`}
                  >
                    <a
                      className="page-link"
                      onClick={() => getProductsBasedOnPage(pageNumber - 1)}
                    >
                      Previous
                    </a>
                  </li>

                  {[...new Array(pageCount)].map((page, index) => {
                    return (
                      <li
                        className={`page-item ${
                          pageNumber == index + 1 ? "active" : ""
                        }`}
                      >
                        <a
                          className={`page-link`}
                          href="#"
                          onClick={() => getProductsBasedOnPage(index + 1)}
                        >
                          {index + 1}
                        </a>
                      </li>
                    );
                  })}
                  <li
                    className={`page-item ${
                      pageNumber == pageCount ? "disabled" : ""
                    }`}
                  >
                    <a className="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
        <idv>Products from Amazon</idv>
      </div>
    </Layout>
  );
};

export default HomePage;
