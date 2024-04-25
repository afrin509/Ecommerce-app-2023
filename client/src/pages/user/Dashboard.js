import React from "react";
import Layout from "../../comopnents/Layout/Layout.js";
import UserMenu from "../../comopnents/Layout/UserMenu.js";
import { useAuth } from "../../context/auth.js";
const Dashboard = () => {
	const [auth] = useAuth();
	return (
		<Layout title="DashBoard-Ecommerce App">
			<div className="row">
				<div className="col-md-3">
					<UserMenu />
				</div>
				<div className="col-md-9">
					<div className="card w-75 p-3">
						<h3>{auth?.user?.name}</h3>
						<h3>{auth?.user?.email}</h3>
						<h3>{auth?.user?.address}</h3>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Dashboard;
