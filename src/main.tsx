import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@styles/index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { MPPlayerSiteStore } from "@redux-app/store.ts";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={MPPlayerSiteStore}>
            <App />
        </Provider>
    </StrictMode>,
);
