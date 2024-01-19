import {Authenticated, GitHubBanner, Refine, WelcomePage} from "@refinedev/core";
import {DevtoolsPanel, DevtoolsProvider} from "@refinedev/devtools";
import {RefineKbar, RefineKbarProvider} from "@refinedev/kbar";

import {AuthPage, ErrorComponent, ThemedLayoutV2, useNotificationProvider} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
    CatchAllNavigate,
    DocumentTitleHandler, NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import {App as AntdApp} from "antd";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import {ColorModeContextProvider} from "./contexts/color-mode";
import {AntdInferencer} from "@refinedev/inferencer/antd";
import basicAuthProvider from "./basicAuthProvider";

function AppBasicAuth() {
    return (
        <BrowserRouter>
            {/*<GitHubBanner />*/}
            <RefineKbarProvider>
                <ColorModeContextProvider>
                    <AntdApp>
                        <DevtoolsProvider>
                            <Refine
                                authProvider={basicAuthProvider}
                                notificationProvider={useNotificationProvider}
                                routerProvider={routerBindings}
                                dataProvider={dataProvider("http://localhost:8080")}
                                resources={[
                                    {
                                        name: "tickets",
                                        list: "/tickets",
                                        create: "/tickets/create",
                                        show: "/tickets/show/:id",
                                    },
                                ]}
                                options={{
                                    syncWithLocation: true,
                                    warnWhenUnsavedChanges: true,
                                    useNewQueryKeys: true,
                                    projectId: "BuUKFw-QxdD1T-6MFsDT",
                                }}
                            >
                                <Routes>
                                    <Route element={
                                        <Authenticated key="authenticated-routes" v3LegacyAuthProviderCompatible={false}
                                                       fallback={<CatchAllNavigate to="/login"/>}>
                                            <ThemedLayoutV2>
                                                <Outlet/>
                                            </ThemedLayoutV2>
                                        </Authenticated>
                                    }
                                    >
                                        <Route index element={<NavigateToResource resource="tickets"/>}/>
                                        <Route path="tickets">
                                            <Route index element={<AntdInferencer/>}/>
                                            <Route path="create" element={<AntdInferencer/>}/>
                                            <Route path="show/:id" element={<AntdInferencer/>}/>
                                        </Route>
                                    </Route>
                                    <Route element={
                                        <Authenticated key="auth" v3LegacyAuthProviderCompatible={false}
                                                       fallback={<Outlet/>}>
                                            <NavigateToResource/>
                                        </Authenticated>
                                    }
                                    >
                                        <Route path="/login" element={<AuthPage type="login"/>}/>
                                        <Route path="/register" element={<AuthPage type="register"/>}/>
                                    </Route>
                                    <Route element={
                                        <Authenticated key="catch-all" v3LegacyAuthProviderCompatible={false}
                                                       fallback={<Outlet/>}>
                                            <ThemedLayoutV2>
                                                <Outlet/>
                                            </ThemedLayoutV2>
                                        </Authenticated>
                                    }
                                    >
                                        <Route path="*" element={<ErrorComponent/>}/>
                                    </Route>
                                </Routes>
                                <RefineKbar/>
                                <UnsavedChangesNotifier/>
                                <DocumentTitleHandler/>
                            </Refine>
                            <DevtoolsPanel/>
                        </DevtoolsProvider>
                    </AntdApp>
                </ColorModeContextProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default AppBasicAuth;
