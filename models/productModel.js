import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		category: {
			type: mongoose.Schema.ObjectId,
			ref: "Category",
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},

		shipping: {
			type: Boolean,
		},
		photo: {
			data: Buffer,
			contentType: String
		}
	},
	{ timestamps: true }
);
const ImageSchema = new mongoose.Schema({
	imageData: {
	  type: Buffer, // Use Buffer data type to store binary data (image)
	  required: true,
	},
  });
export default mongoose.model("products", productSchema);
