import React from "react";
import {createRoot} from "react-dom/client";
import AppBasic from "./AppBasic";
import AppBasicAuth from "./AppBasicAuth";
import AppKeycloak from "./AppKeycloak";
import {AuthProvider} from "react-oidc-context";
import AppBasic2DataProviders from "./AppBasic2DataProviders";
import AppBasicUpdateAction from "./AppBasicUpdateAction";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

const oidcConfig = {
    authority: "http://host.docker.internal:8081/realms/refine",
    client_id: "refine-ui",
    redirect_uri: "http://localhost:5173",
    loadUserInfo: true,
    // userStore: new WebStorageStateStore({ store: window.localStorage }),
    onSigninCallback: () => {
        window.history.replaceState({}, document.title, window.location.pathname);
    },
};

root.render(
    <React.StrictMode>
        {/*<AuthProvider {...oidcConfig}>*/}
        {/*    <AppKeycloak/>*/}
        {/*</AuthProvider>*/}
            <AppBasic/>
    </React.StrictMode>
);
