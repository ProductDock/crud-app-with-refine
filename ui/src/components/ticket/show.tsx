import {BaseKey, IResourceComponentsProps, useShow} from "@refinedev/core";
import {Timeline, Typography} from "antd";
import {Show, TextField} from "@refinedev/antd";

const {Title} = Typography;

interface ITicket {
    id: BaseKey,
    title: string,
    description: string,
    category: string,
    priority: string,
    dueDate: string,
    history: ITicketEvent[]
}

interface ITicketEvent {
    timestamp: string,
    event: string,
}

export const ShowTicketDetails: React.FC<IResourceComponentsProps> = () => {
    const {queryResult} = useShow<ITicket>();
    const {data, isLoading} = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <TextField value={record?.id}/>
            <Title level={5}>Title</Title>
            <TextField value={record?.title}/>
            <Title level={5}>Description</Title>
            <TextField value={record?.description}/>
            <Title level={5}>Priority</Title>
            <TextField value={record?.priority}/>
            <Title level={5}>Category</Title>
            <TextField value={record?.category}/>
            <Title level={5}>Due Date</Title>
            <TextField value={record?.dueDate}/>
            <Title level={5}>Timeline</Title>
            <Timeline reverse={true} items={record?.history?.map(h => ({children: `${h.timestamp} - ${h.event}`}))}
            />
        </Show>
    );
};