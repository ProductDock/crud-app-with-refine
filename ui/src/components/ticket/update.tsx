import {IResourceComponentsProps, useApiUrl, useCustomMutation, useShow} from "@refinedev/core";
import {Button, Form, Select} from "antd";
import {Show} from "@refinedev/antd";
import React from "react";
import {useParams} from "react-router-dom";
interface FormValues {
    id?: string;
    event?: string;
}

export const UpdateTicket = () => {

    let {id} = useParams()

    const apiUrl = useApiUrl();
    const {mutate} = useCustomMutation({});
    const [form] = Form.useForm();

    const onSubmit = (values: any) => {
        const url = `${apiUrl}/tickets/${id}/status`
        mutate({
            url: url,
            method: "patch",
            values: values,
            successNotification: (data, values) => {
                return {
                    message: `Successfully fetched.`,
                    description: "Success with no errors",
                    type: "success",
                };
            },
        });
    };
    return (
        <Show>
            <Form form={form} layout="vertical" onFinish={onSubmit}>
                <Form.Item
                    label="Event"
                    name={["event"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select>
                        <Select.Option value="wip">WIP</Select.Option>
                        <Select.Option value="skip">Skip</Select.Option>
                        <Select.Option value="reopen">Reopen</Select.Option>
                        <Select.Option value="done">Done</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Show>

    );
};