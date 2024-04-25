import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
export const createCategoryController = async (req, res) => {
	try {
		const { name } = req.body;
		if (!name) {
			return res.send("Category Name is Required!!!");
		}
		const existingCategory = await categoryModel.findOne({ name });
		if (existingCategory) {
			return res.status(400).send({
				success: false,
				message: "This Category already exists",
			});
		}
		//register this new category
		const newCategory = await new categoryModel({
			name,
			slug: slugify(name, { lowercase: true }),
		}).save();
		return res.status(200).send({
			success: true,
			category: newCategory,
			message: "Category Created Successfully",
		});
	} catch (error) {
		console.log("error while creating a category", error);
		res.status(500).send({
			success: false,
			message: "error while creating category",
			error,
		});
	}
};
//update the category
export const updateCategoryController = async (req, res) => {
	try {
		const { name } = req.body;
		const { id } = req.params;
		const updatedCategory = await categoryModel.findByIdAndUpdate(
			id,
			{
				name,
				slug: slugify(name, { lowercase: true }),
			},
			{ new: true }
		);
		return res.status(200).send({
			success: true,
			message: "Category is updated Successfully",
			updatedCategory,
		});
	} catch (err) {
		console.log("err while updating the category", err);
		return res.send(404).status({
			success: false,
			err: err,
			message: "error while updating the category",
		});
	}
};
//get all the categories
export const categoryController = async (req, res) => {
	try {
		const category = await categoryModel.find({});
		return res.status(200).json({
			success: true,
			message: "All categories",
			categories: category,
		});
	} catch (err) {
		console.log("error while getting all categories", err);
		return res.status(404).send({
			success: false,
			err: err,
			message: "error while getting all categories",
		});
	}
};
//get a single category when slug is given
// single category
export const singleCategoryController = async (req, res) => {
	try {
		const category = await categoryModel.findOne({ slug: req.params.slug });
		res.status(200).send({
			success: true,
			message: "Get SIngle Category SUccessfully",
			category,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			error,
			message: "Error While getting Single Category",
		});
	}
};
//delete category controller
export const deleteCategoryController = async(req,res) => {
    try {
		const category = await categoryModel.findOneAndDelete({ _id: req.params.id });
		return res.json({
			success: true,
			message: "Deleted category successfully!!!!"
		});
    }
    catch (err)
    { 
		return res.json({
			success: false,
			message: 'Failed to delete this category!!!',
			error:err
	   })
    }
};
