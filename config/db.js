import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Get the directory path of the current ES6 module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// console.log("direname", __dirname);
dotenv.config({ path: `${__dirname}/../.env` });
// console.log("process.env.MONGODB_URL", process.env.MONGODB_URL);
// mongoose.connect(process.env.MONGODB_URL, {
// 	useNewUrlParser: true,
// 	useFindAndModify: false,
// 	useUnifiedTopology: true,
// });
 export const connectDB = async () => {
	try {
		const connection = await mongoose.connect(process.env.MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
        });
        console.log("connection.connection.host", connection.connection.host);
	} catch (err) {
		console.log("error occured during connection", err);
	}
};
