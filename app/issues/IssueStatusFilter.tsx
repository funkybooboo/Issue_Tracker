'use client';

import {Select} from "@radix-ui/themes";
import {Status} from "@prisma/client";
import {useRouter, useSearchParams} from "next/navigation";

const statuses: {label: string, value?: Status}[]= [
    {label: "All"},
    {label: "Open", value: 'OPEN'},
    {label: "In Progress", value: 'IN_PROGRESS'},
    {label: "Closed", value: 'CLOSED'},
];

const IssueStatusFilter = () => {

    const router = useRouter();
    const searchParams = useSearchParams();

    return (
        <Select.Root defaultValue={searchParams.get("status") || ''} onValueChange={(status) => {
            const params = new URLSearchParams();
            if (status !== 'none') {
                params.set('status', status);
            }
            const orderBy = searchParams.get('orderBy');
            if (orderBy) {
                params.set('orderBy', orderBy!);
            }
            const query = params.size ? '?' + params.toString() : '';
            router.push("/issues"+query);
        }}>
            <Select.Trigger placeholder={"Filter by status..."}/>
            <Select.Content>
                {statuses.map((status) => (
                    <Select.Item key={status.value} value={status.value || 'none'}>{status.label}</Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    );
}

export default IssueStatusFilter;