import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {ErrorComponent, ThemedLayoutV2, useNotificationProvider} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
    DocumentTitleHandler, NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { App as AntdApp } from "antd";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { AntdInferencer } from "@refinedev/inferencer/antd";

function App() {
    return (
        <BrowserRouter>
            {/*<GitHubBanner />*/}
            <RefineKbarProvider>
                <ColorModeContextProvider>
                    <AntdApp>
                        <DevtoolsProvider>
                            <Refine
                                notificationProvider={useNotificationProvider}
                                routerProvider={routerBindings}
                                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                                resources={[
                                    {
                                        name: "blog_posts",
                                        list: "/blog-posts",
                                        show: "/blog-posts/show/:id",
                                        create: "/blog-posts/create",
                                        edit: "/blog-posts/edit/:id",
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
                                    <Route
                                        element={
                                            <ThemedLayoutV2>
                                                <Outlet />
                                            </ThemedLayoutV2>
                                        }
                                    >
                                        <Route index element={<NavigateToResource resource="blog_posts" />} />

                                        <Route path="blog-posts">
                                            <Route index element={<AntdInferencer />} />
                                            <Route path="show/:id" element={<AntdInferencer />} />
                                            <Route path="edit/:id" element={<AntdInferencer />} />
                                            <Route path="create" element={<AntdInferencer />} />
                                        </Route>

                                        <Route path="*" element={<ErrorComponent />} />
                                    </Route>
                                </Routes>
                                <RefineKbar />
                                <UnsavedChangesNotifier />
                                <DocumentTitleHandler />
                            </Refine>
                            <DevtoolsPanel />
                        </DevtoolsProvider>
                    </AntdApp>
                </ColorModeContextProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;
