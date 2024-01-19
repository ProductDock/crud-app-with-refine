import {GitHubBanner, Refine, WelcomePage} from "@refinedev/core";
import {DevtoolsPanel, DevtoolsProvider} from "@refinedev/devtools";
import {RefineKbar, RefineKbarProvider} from "@refinedev/kbar";

import {ErrorComponent, ThemedLayoutV2, useNotificationProvider} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
    DocumentTitleHandler, NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import {App as AntdApp} from "antd";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import {ColorModeContextProvider} from "./contexts/color-mode";
import {AntdInferencer} from "@refinedev/inferencer/antd";
import {DataProvider as Strapiv4DataProvider} from "@refinedev/strapi-v4";
import {SystemNewsUpdate} from "./components";

function AppBasic2DataProviders() {
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
                                dataProvider={{
                                    default: dataProvider("http://localhost:8080"),
                                    systemNewsUpdateProvider: Strapiv4DataProvider("http://localhost:1337/api"),
                                }}
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
                                    <Route element={<ThemedLayoutV2><Outlet/></ThemedLayoutV2>}>
                                        <Route index element={<NavigateToResource resource="tickets"/>}/>

                                        <Route path="tickets">
                                            <Route index element={
                                                <>
                                                    <AntdInferencer/>
                                                    <SystemNewsUpdate/>
                                                </>
                                            }/>
                                            <Route path="create" element={<AntdInferencer/>}/>
                                            <Route path="show/:id" element={<AntdInferencer/>}/>
                                        </Route>

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

export default AppBasic2DataProviders;
