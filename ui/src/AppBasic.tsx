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

function AppBasic() {
    return (
        <BrowserRouter>
            {/*<GitHubBanner />*/}
            <RefineKbarProvider>
                <ColorModeContextProvider>
                    <AntdApp>
                            <Refine
                                notificationProvider={useNotificationProvider}
                                routerProvider={routerBindings}
                                dataProvider={dataProvider("http://localhost:8080")}
                                resources={[
                                    {
                                        name: "tickets",
                                        list: "/tickets",
                                        create: "/tickets/create",
                                        show: "/tickets/show/:id",
                                        meta: {
                                            canDelete: true,
                                        },
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
                                            <Route index element={<AntdInferencer hideCodeViewerInProduction={false}/>}/>
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
                    </AntdApp>
                </ColorModeContextProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default AppBasic;
