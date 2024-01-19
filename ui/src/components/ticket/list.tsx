import React from "react";
import {IResourceComponentsProps, BaseRecord, useNavigation, useLink} from "@refinedev/core";
import { useTable, List, ShowButton } from "@refinedev/antd";
import {Table, Space, Button} from "antd";

export const TicketList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });
    const Link = useLink();

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="Id" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column dataIndex="description" title="Description" />
                <Table.Column dataIndex="priority" title="Priority" />
                <Table.Column dataIndex="category" title="Category" />
                <Table.Column dataIndex="dueDate" title="Due Date" />
                <Table.Column
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record: BaseRecord) => (
                        <Space>
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <Link
                                to={"/update/"+record.id}
                                replace={false}
                            >
                                <Button size="small">Update</Button>
                            </Link>
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
