import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
import categoryModel from "../models/categoryModel.js";
export const createProductController = async (req, res) => {
  try {
    console.log("req.feilds inside product controller", req.fields, req.files);
    const { name, description, price, quantity, category, shipping } =
      req.fields;
    const { photo } = req.files;
    // if (
    // 	!name ||
    // 	!description ||
    // 	!price ||
    // 	!category ||
    // 	!quantity ||
    // 	!shipping ||!photo
    // ) {
    // 	return res.json({
    // 		success: false,
    // 		message: "some property is missing in creating a product",
    // 	});
    // }
    switch (1) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !photo && photo.size > 5000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }
    const existingProduct = await productModel.findOne({ name });
    if (existingProduct) {
      return res.status(200).json({
        success: false,
        message: "This Product already exists!!!",
      });
    }
    console.log(
      "photo before saving",
      photo,
      photo.data,
      photo.path,
      photo.size
    );
    const newProduct = new productModel({
      name,
      slug: slugify(name, { lower: true }),
      description,
      price,
      category,
      quantity,
      shipping,
    });
    newProduct.photo.data = fs.readFileSync(photo.path);
    newProduct.photo.contentType = photo.type;
    newProduct
      .save()
      .then((newProd) => {
        return res.status(200).json({
          success: true,
          message: "Product created successfully",
          product: newProd,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: "Error while saving the new product",
          err: err,
        });
      });
    // await newProduct.save();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error occured while creating the product",
      error: err,
    });
  }
};
//get product except photos
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-photo")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Fetched Products Successfully",
      products: products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error occured while fetching all products",
      error: err,
    });
  }
};

//get single product based on slug
export const getSingleProductController = async (req, res) => {
  try {
    console.log("params", req.params);
    const singleProduct = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    console.log("singleProduct", singleProduct);
    return res.status(200).json({
      success: true,
      message: "Fetched single product Successfully",
      singleProduct: singleProduct,
    });
  } catch (err) {
    console.log("error while fetching single product", err);
    return res.status(500).json({
      success: false,
      message: "Error occured while fetching all products",
      error: err,
    });
  }
};

// get product photos
export const productPhotoController = async (req, res) => {
  console.log("inside product photo controller", req.params.pid);
  try {
    const product = await productModel.findById(req.params.pid);
    console.log("product1", product.name);
    // if(!product)
    // {
    // 	return res.status(500).json({
    // 		success:false,
    // 		message:'Product not found with that product-id',
    // 		 })
    // }
    res.set("Content-type", product.photo.contentType);

    //  return res.status(204).json({
    // success:true,
    // message:'Fetched Product Photo Successfully',
    // productPhoto:'jhjhjjj',
    //  })
    return res.status(200).send(product.photo.data);
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      err,
    });
  }
};
// export const productPhotoController = async (req, res) => {
// 	try {
// 	  const product = await productModel.findById(req.params.pid).select("photo");
// 	  if (product.photo.data) {
// 		res.set("Content-type", product.photo.contentType);
// 		return res.status(200).send(product.photo.data);
// 	  }
// 	} catch (error) {
// 	  console.log(error);
// 	  res.status(500).send({
// 		success: false,
// 		message: "Erorr while getting photo",
// 		error,
// 	  });
// 	}
//   };
export const deleteProductController = async (req, res) => {
  try {
    console.log("inside delete product controller");
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).json({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};
export const updateProductController = async (req, res) => {
  try {
    console.log(
      "inside updateProductController",
      req.params.pid,
      { ...req.files },
      { ...req.fields }
    );
    let obj = {};
    if (Object.keys(req.files).length !== 0) {
      let photo = {};
      photo.data = fs.readFileSync(req.files.photo.path);
      photo.contentType = req.files.photo.type;
      console.log(
        "photo after converting inside update product contrller",
        req.files.photo.path,
        req.files.photo.type,
        photo
      );
      obj.photo = photo;
    }

    const getProduct = await productModel.findByIdAndUpdate(
      req.params.pid,
      { $set: { ...req.fields, ...obj } },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Product Updated Successfully",
      Product: getProduct,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Error while updating product",
      err,
    });
  }
};
//filter products
export const productFiltersController = async (req, res) => {
  const { filteredCategories, filteredPrice, search } = req.body;
  let args = {},
    query = {};
  query["$and"] = [];
  args.category = { $in: filteredCategories };
  args.price = { $gte: filteredPrice[0], $lte: filteredPrice[1] };
  if (search) {
    args.name = { $regex: search, $options: "i" };
  }
  try {
    console.log("query", {
      ...query,
    });
    if (filteredCategories.length > 0) {
      query["$and"].push({ category: { $in: filteredCategories } });
    }
    if (filteredPrice.length > 0) {
      query["$and"].push({
        price: { $gte: filteredPrice[0], $lte: filteredPrice[1] },
      });
    }

    if (search.length > 0) {
      query["$and"].push({ name: { $regex: search, $options: "i" } });
    }
    console.log("query", {
      ...query,
    });
    const products = await productModel
      .find({
        ...query,
      })
      .select("-photo")
      .sort({ createdAt: -1 });
    // const products = await productModel
    //   .find({
    //     $and: [
    //       { categories: { $in: checked } }, // Category check
    //       {
    //         price: {
    //           $gte: filteredPrice[0], // Minimum price
    //           $lte: filteredPrice[1], // Maximum price
    //         },
    //       }, // Price range check
    //     ],
    //   }).select("-photo").sort({ createdAt: -1 })
    // ,price:{
    //        $gte:filteredPrice[0],
    //        $lte:filteredPrice[1]
    //     }
    // const products = await productModel.find(args);

    return res.status(200).json({
      success: true,
      message: "Fetched Filtered Product",
      products,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while filtering product",
      error,
    });
  }
};

export const productListController = async (req, res) => {
  let pageNumber = req.params.page;
  let { productsPerPage } = req.body;
  try {
    console.log("hello", pageNumber, productsPerPage);
    const products = await productModel
      .find({})
      .skip((pageNumber - 1) * productsPerPage)
      .limit(productsPerPage)
      .select("-photo");
    console.log("products inside product list controller", products);
    return res.status(200).json({
      success: true,
      products,
      message: "Fetched Products Successfully !!!!",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Error while getting products per page",
      err,
    });
  }
};
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

export const searchProductsController = async (req, res) => {
  const { search } = req.body;
  try {
    const products = await productModel
      .find({
        $or: [
          { name: { $regex: search } },
          { description: { $regex: search } },
        ],
      })
      .select("-photo");
    res.status(200).send({
      success: true,
      products,
      message: "Products Searched SuccessFully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting all products",
      error,
    });
  }
};
//get products based on category
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    // console.log("products inside product category controller", products,category);
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};
//get products based on category except that product id
export const getProductsFromCategoryController = async (req, res) => {
  try {
    const products = await productModel
      .find({
        category: req.params.cid,
        _id: { $ne: req.params.pid },
      })
      .select("-photo")
      .limit(7);
    console.log("products inside getProductsFromCategoryController", products);
    res.status(200).send({
      success: true,
      message: "Products fetched from a category successfully",
      products,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Error while getting products from category",
      error: err,
    });
  }
};
