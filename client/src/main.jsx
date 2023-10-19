import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="74929370675-3o1v81d9asdbfn0sdok5oq41p7orjdvj.apps.googleusercontent.com">
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
    ,
  </GoogleOAuthProvider>
);