import {AuthContextProps} from "react-oidc-context";
import {AuthBindings} from "@refinedev/core";

export const keycloakAuthProvider= (auth: AuthContextProps, axiosInstance: any)=>{
    const keycloakAuthProvider: AuthBindings = {
        login: async () => {
            await auth.signinRedirect();
            return {
                success: false,
                error: new Error("Login failed"),
            };
        },
        logout: async () => {
            try {
                await auth.removeUser();
                return {
                    success: true,
                    logout: true,
                    redirectTo: "/login",
                };
            } catch (error) {
                return {
                    success: false,
                    error: new Error("Logout failed"),
                };
            }
        },
        check: async () => {
            try {
                if (auth.isAuthenticated) {
                    const token = auth.user?.access_token;
                    axiosInstance.defaults.headers.common = {
                        Authorization: `Bearer ${token}`,
                    };
                    return {
                        authenticated: true,
                    };
                } else {
                    return {
                        authenticated: false,
                        logout: true,
                        redirectTo: "/login",
                        error: {
                            message: "Check failed",
                            name: "Token not found",
                        },
                    };
                }
            } catch (error) {
                return {
                    authenticated: false,
                    logout: true,
                    redirectTo: "/login",
                    error: {
                        message: "Check failed",
                        name: "Token not found",
                    },
                };
            }
        },
        onError: async (error) => {
            console.error(error);
            return {error};
        },
    }
    return keycloakAuthProvider;
}