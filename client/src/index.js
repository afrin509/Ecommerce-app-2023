import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals.js";
import { AuthProvider } from "./context/auth.js";
import { SearchProvider } from "./context/search.js";
import { CartProvider } from "./context/cart.js";
// import 'antd/dist/antd.css'
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CartProvider>
    <SearchProvider>
      <AuthProvider>
        {/* <React.StrictMode> */}
          <App />
        {/* </React.StrictMode> */}
      </AuthProvider>
    </SearchProvider>
  </CartProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
