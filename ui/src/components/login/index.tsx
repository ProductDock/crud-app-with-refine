import {useLogin} from "@refinedev/core";
import React from "react";
import {SaveButton} from "@refinedev/antd";

export const Login: React.FC = () => {
    const {mutate: login} = useLogin();

    return (
        <>
            <SaveButton
                onClick={() => login({})}
                style={{width: "240px"}}
            >
                Sign in
            </SaveButton>
            <div>
                Powered by Keycloak
            </div>
        </>
    );
};