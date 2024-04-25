import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getProductsFromCategoryController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  searchProductsController,
  updateProductController,
} from "../controllers/productController.js";
const router = express.Router();
import formidableMiddleware from "express-formidable";
import formidable from "formidable";
router.use(express.urlencoded({ extended: true }));

// import formidable from 'express-formidable'
// router.get("/create-product", (req, res) => {
// 	console.log("inside create product request");
// 	res.send(`
//     <h2>With <code>"express"</code> npm package</h2>
//     <form action='/api/v1/product/upload' enctype="multipart/form-data" method="post">
//       <div>Text field title: <input type="text" name="title" /></div>
//       <div>File: <input type="file" name="someExpressFiles" multiple="multiple" /></div>
//       <input type="submit" value="Upload" />
//     </form>
//   `);
// });
// router.use(formidableMiddleware());
router.post(
  "/upload",
  requireSignIn,
  isAdmin,
  // (req, res, next) => {
  // 	const form = formidable({});

  // 	form.parse(req, (err, fields, files) => {
  // 	  if (err) {
  // 		console.log("error while parsing",err);
  // 		next(err);
  // 		return;
  // 	  }
  // 	  console.log("before controller fields",fields,"files",files)
  // 	  res.json({ fields, files });
  // 	  next();
  // 	})},
  formidableMiddleware(),
  // (req, res, next) => {
  // 	// Files and fields are available directly in req.files and req.fields
  // 	console.log("fields", req.fields);
  // 	console.log("files", req.files);

  // 	// Call the next middleware or controller
  // 	next();
  //   },
  createProductController
);
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidableMiddleware(),
  updateProductController
);
router.get(
  "/get-product",
  // requireSignIn,
  // isAdmin,
  // formidable(),
  getProductController
);
router.post("/filter-products", productFiltersController);
router.get("/get-product/:slug", getSingleProductController);
router.get("/product-photo/:pid", productPhotoController);
router.delete("/delete-product/:pid", deleteProductController);
router.get("/product-count", productCountController);
router.post("/product-list/:page", productListController);
router.post("/search-product", searchProductsController);
router.get("/related-products/:cid/:pid", getProductsFromCategoryController);
router.get("/product-category/:slug", productCategoryController);
export default router;
