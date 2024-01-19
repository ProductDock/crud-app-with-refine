import type {AuthBindings} from "@refinedev/core";

const mockUsers = [
    {
        email: "joe@gmail.com"
    },
    {
        email: "jane@gmail.com"
    }
];

const basicAuthProvider: AuthBindings = {
    login: async ({email, password}) => {
        const user = mockUsers.find((item) => item.email === email);

        if (user){
            localStorage.setItem("auth", JSON.stringify(user));
            return {
                success: true,
                redirectTo: "/",
            };
        }

        return {
            success: false,
            error: {
                message: "Login Error",
                name: "Invalid email or password"
            }
        }
    },
    check: async () => {
        const user = localStorage.getItem("auth");

        if (user) {
            return {
                authenticated: true,
            };
        }

        return {
            authenticated: false,
            logout: true,
            redirectTo: "/login",
            error: {
                message: "Check failed",
                name: "Unauthorized",
            },
        };
    },
    logout: async () => {
        localStorage.removeItem("auth");
        return {
            success: true,
            redirectTo: "/login",
        };
    },
    onError: async (error) => {
        if (error.status === 401 || error.status === 403) {
            return {
                logout: true,
                redirectTo: "/login",
                error,
            };
        }

        return {};
    },
}

export default basicAuthProvider;