import bcrypt from "bcrypt";
export const hashPassword = async (password) => {
	try {
		const hashedPassword = await bcrypt.genSalt(10).then((salt, err) => {
			if (err) {
				console.log("error in salt generation", salt);
			}
			console.log("Salt: ", salt);
			console.log("password",password)
			return bcrypt.hash(password, salt);
		});
		console.log("hashedPassword did successfully", hashedPassword);
		return hashedPassword;
	} catch (err) {
		console.log("hashing the password is interrupted", err);
	}
};
export const comparePassword = async (password, hashedPassword) => {
	try {
		const res = await bcrypt.compare(password, hashedPassword);
		if (!res) {
			console.log("Invalid Password");
		}
	} catch (err) {
		console.log("err while comparing passwords", err);
	}
};
