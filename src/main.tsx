import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { persistStore } from "redux-persist";
import { createStore } from "./config/create-store";
import { setupListeners } from "@reduxjs/toolkit/query";
import { extraArgument } from "./config/extraArgument";
import { Provider } from "./provider/Provider";
import { createRouter } from "./routes/Router";
import { ToastContainer } from "react-toastify";

const store = createStore(extraArgument);
setupListeners(store.dispatch);

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider
      store={store}
      persistor={persistor}
      router={(s) => createRouter({ store: s })}
    />
    <ToastContainer style={{ width: "450px" }} />
  </React.StrictMode>
);
