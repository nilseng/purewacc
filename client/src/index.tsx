import { Auth0Provider } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import history from "./utils/history";

// A function that routes the user to the right place
// after login
const onRedirectCallback: any = (appState: any) => {
  history.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
};

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN || ""}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ""}
    audience={process.env.REACT_APP_API_AUDIENCE}
    redirectUri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <App />
  </Auth0Provider>
);

serviceWorker.unregister();
