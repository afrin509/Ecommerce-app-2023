import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	phone: {
		type: Number,
		required: true,
    },
    address: {
        type: String,
        required:true
    },
    role: {
        type: String,
        default:"admin"
	},
	token: {
		type: String,
		required:true

	}
}, { timestamps: true });
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}
	const hash = await bcrypt.hash(this.password, Number(10));
	this.password = hash;
	next();
});

export default mongoose.model( 'user', userSchema );