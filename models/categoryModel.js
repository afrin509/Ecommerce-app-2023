import mongoose from "mongoose";
import slugify from "slugify";
const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trime: true,
	},
	slug: {
		type: String,
		lowercase: true,
	},
});
categorySchema.pre("save", function (next) {
	if (this.isModified("name")) {
		this.slug = slugify(this.name, { lowercase: true });
	}
	next();
});
export default mongoose.model("Category", categorySchema);
