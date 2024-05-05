import React, { useEffect, useRef, useState } from "react";
import AdminMenu from "../../comopnents/Layout/AdminMenu.js";
import Layout from "../../comopnents/Layout/Layout.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Modal from "antd/es/modal/Modal.js";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const timeOutRef = useRef(null);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({
    id: "",
    name: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedValue, setUpdatedValue] = useState("");
  const [ok, setOk] = useState(false);

  const getAllCategories = async (res) => {
    try {
      const response = await fetch(
        "https://ecommerce-app-2023-0ik6.onrender.com/api/v1/category/get-category"
      );
      if (!response.ok) {
        throw new Error("unable to fetch categories");
      }

      const p = await response.json();
      //  console.log(response.json().categories);
      setCategories(p.categories);
    } catch (err) {
      console.log("error while fetching categories from backend");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  console.log("categories", categories);
  const deleteCategoryHandler = async (categoryName, categoryId) => {
    try {
      const response = await axios.delete(
        `https://ecommerce-app-2023-0ik6.onrender.com/api/v1/category/delete-category/${categoryId}`
      );
      if (response.data.success) {
        toast.success(`${categoryName} category deleted SuccessFully`);
        getAllCategories();
      }
    } catch (err) {
      toast.error("Error while deleting the Category");
    }
  };
  const editCategoryHandler = async (categoryId, categoryName) => {
    setIsModalOpen(true);
    setSelectedCategory({ id: categoryId, name: categoryName });
  };
  const UpdatedValueChangeHandler = (event) => {
    setUpdatedValue(event.target.value);
  };

  const createNewCategoryHandler = async () => {
    if (newCategory.length < 5) {
      toast.error(`${newCategory} Category should be atleast of 5 letters`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const res = await axios.post(
        "https://ecommerce-app-2023-0ik6.onrender.com/api/v1/category/create-category",
        { name: newCategory }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllCategories();
        setNewCategory("");
      } else {
        toast.error(res.data.message);
      }
    }
  };
  const updateCategory = async () => {
    console.log("ok", ok, updatedValue, updatedValue.length);
    if (ok) {
      if (updatedValue.length <= 3) {
        console.log("updated value");
        setOk(false);
        toast.error("Min Length should be 5");
        return;
      } else {
        try {
          const { data } = await axios.put(
            `https://ecommerce-app-2023-0ik6.onrender.com/api/v1/category/update-category/${selectedCategory.id}`,
            { name: updatedValue }
          );
          if (data?.success) {
            setIsModalOpen(false);
            setUpdatedValue("");
            setSelectedCategory(null);
            setOk(false);
            toast.success(
              `${selectedCategory.name} is updated to ${updatedValue}`
            );
            getAllCategories();
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    // else
    // {

    // 	clearTimeout(timeOutRef.current);
    // 	timeOutRef.current=setTimeout(() => {
    // 		console.log('update',updatedValue)
    // 		if(isModalOpen)
    // 	toast.info(`Click on OK to save to the afrin server ${updatedValue}`);
    // 	}, 10000);

    // }
  };
  const saveUpdatedValueToDb = () => {
    setOk(true);
    //    updateCategory();
  };
  useEffect(() => {
    if (ok) {
      updateCategory();
    }
  }, [ok, updatedValue]);
  return (
    <Layout title="create-category">
      <ToastContainer />
      Admin Panel
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h5>Manage Category</h5>

          <div className="p-3 w-50 mb-3">
            <input
              value={newCategory}
              type="text"
              className="form-control"
              placeholder="Enter New Category"
              onChange={(event) => setNewCategory(event.target.value)}
            />
            <button
              type="button"
              class="btn btn-primary mt-3"
              onClick={createNewCategoryHandler}
            >
              Submit
            </button>
          </div>
          <div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => {
                  return (
                    <tr>
                      <td>{category.name}</td>
                      <td>
                        <button
                          onClick={() =>
                            editCategoryHandler(category._id, category.name)
                          }
                          type="button"
                          class="btn btn-primary"
                        >
                          Edit
                        </button>{" "}
                        <button
                          type="button"
                          onClick={() =>
                            deleteCategoryHandler(category.name, category._id)
                          }
                          class="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        title="Update Category"
        open={isModalOpen}
        onOk={saveUpdatedValueToDb}
        onCancel={() => {
          setUpdatedValue("");
          setIsModalOpen(false);
        }}
      >
        <input
          value={updatedValue}
          minLength={3}
          type="text"
          className="form-control"
          placeholder="Enter Updated Category Name"
          onChange={UpdatedValueChangeHandler}
        />
      </Modal>
    </Layout>
  );
};

export default CreateCategory;
