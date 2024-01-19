import React from "react";

import {BaseKey, HttpError, useList} from "@refinedev/core";
import {normalizeData} from "@refinedev/strapi-v4";
import {BlocksRenderer} from "@strapi/blocks-react-renderer";
import {Alert, Divider} from 'antd';
interface ISystemNewsUpdate {
    id: BaseKey;
    Title: string;
    Description: string;
}

export const SystemNewsUpdate = () => {
    const {data, isLoading, isError} = useList<ISystemNewsUpdate, HttpError>({
        resource: "system-news-updates",
        dataProviderName: "systemNewsUpdateProvider",
    });

    const updates = data?.data ?? [];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong!</div>;
    }
    return (
        <>
            <Alert style={{marginLeft:20}} message="Systems news posts" type="success" />
            <Divider/>
            <ul>
                {normalizeData(updates).map((np: any) => (
                    <li key={np.id}>
                        <h4>

                            {np.Title}
                        </h4>
                        <BlocksRenderer content={np.Description}/>
                    </li>
                ))}
            </ul>
        </>
    );
};