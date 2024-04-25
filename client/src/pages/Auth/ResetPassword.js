import React, { useState } from "react";
import Layout from "../../comopnents/Layout/Layout.js";
import axios from "axios";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleSubmit = (e) => {
			e.preventDefault();

			axios
                .post("http://localhost:8080/api/v1/auth/passwordReset", {
                    password,confirmPassword
                })
				.then((res) => {
					if (res.data.success) {
						console.log("Password reset successfully");
					} else {
					}
				})
				.catch((err) => {
					console.error("err", err);
				});
		};
	return (
		<Layout title={"ResetPassword-Ecommerce App"}>
			<div className="form-container" style={{ minHeight: "90vh" }}>
				<form className="d-flex-column" onSubmit={handleSubmit}>
					<h2 className="title">Reset Password Form</h2>

					<div className="mb-3">
						<input
							type="password"
							className="form-control"
							id="inputPassword4"
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							placeholder="New Password"
							required
						/>
					</div>
					<div className="mb-3">
						<input
							type="password"
							className="form-control"
							id="inputPassword4"
							onChange={(e) => {
								setConfirmPassword(e.target.value);
							}}
							placeholder="Confirm Password"
							required
						/>
					</div>

					<button type="submit" className="btn btn-dark">
						Submit
					</button>
				</form>
			</div>
		</Layout>
	);
};

export default ResetPassword;
