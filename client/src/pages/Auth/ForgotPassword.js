import React, { useState } from "react";
import Layout from "../../comopnents/Layout/Layout.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");

	const navigate = useNavigate();
	const handleSignIn = () => {
		navigate("/register");
	};
	const emailChangeHandler = (e) => {
		setEmail(e.target.value);
	};
	const passwordResetHandler = (e) => {
		e.preventDefault();

		axios
			.post("http://localhost:8080/api/v1/auth/forgotPassword", {
				email,
			})
			.then((res) => {
				if (res.data.success) {
					console.log("email sent successfully");
				} else {
					toast.error(res.data.message);
				}
			})
			.catch((err) => {
				console.error("err", err);
			});
	};
	return (
		<Layout title={"ForgotPassword-Ecommerce App"}>
			<div className="container d-flex flex-column">
				<div
					className="row align-items-center justify-content-center
          min-vh-100">
					<div className="col-12 col-md-8 col-lg-4">
						<div className="card shadow-sm">
							<div className="card-body">
								<div className="mb-4">
									<h5>Forgot Password?</h5>
								</div>
								<form>
									<div className="mb-3">
										<label for="email" className="form-label">
											Email
										</label>
										<input
											type="email"
											id="email"
											className="form-control"
											name="email"
											placeholder="Enter Your Email"
											required=""
											onChange={emailChangeHandler}
										/>
									</div>
									<div className="mb-3 d-grid">
										<button
											type="submit"
											onClick={passwordResetHandler}
											className="btn btn-primary">
											Reset Password
										</button>
									</div>
									<span>
										Don't have an account?{" "}
										<button className="btn btn-link" onClick={handleSignIn}>
											Sign In
										</button>
									</span>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default ForgotPassword;
