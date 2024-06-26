import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth.js";
import Spinner from "../utils/Spinner.js";
import axios from "axios";
const AdminRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    const authCheck = async () => {
      console.log("inside authCheck");
      const res = await axios.get(
        "https://ecommerce-app-2023-0ik6.onrender.com/api/v1/auth/admin-auth",
        {
          // headers: {
          //     "Authorization": auth ?.token
          // }
        }
      );
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);
  console.log("ok", ok);
  return ok ? children : <Spinner />;
};

export default AdminRoute;
