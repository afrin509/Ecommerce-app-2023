import React from "react";
import Layout from "../../comopnents/Layout/Layout.js";
import AdminMenu from "../../comopnents/Layout/AdminMenu.js";
import { useAuth } from "../../context/auth.js";

const AdminDashboard = () => {
	const [auth, setAuth] = useAuth();
	console.log("auth", auth,"admin-dashboard");
	return (
		<Layout title={"Admin-Dashboard-Ecommmerce-App"}>
			<div className="container-fluid m-3 p-3">
				<div className="row">
					<div className="col-md-3">
						<AdminMenu />
					</div>
					<div className="col-md-9">
						<div className="card w-75 p-3">
							<h4>Admin Name: {auth?.user?.name}</h4>
							<h4>Admin Email: {auth?.user?.email}</h4>
							<h4>Admin Contact: {auth?.user?.phone}</h4>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default AdminDashboard;
