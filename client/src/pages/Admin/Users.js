import React from "react";
import AdminMenu from "../../comopnents/Layout/AdminMenu.js";
import Layout from "../../comopnents/Layout/Layout.js";

const Users = () => {
	return (
		<Layout title="All-Users">
			Admin Panel
			<div className="row">
				<div className="col-md-3">
					<AdminMenu />
				</div>
				<div className="col-md-9">
					<div className="card w-75 p-3">Users</div>
				</div>
			</div>
		</Layout>
	);
};

export default Users;
