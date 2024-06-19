'use client';

import {Select} from "@radix-ui/themes";
import {Issue, User} from "@prisma/client";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {Skeleton} from "@/app/components";

const AssigneeSelect = ({issue}: {issue: Issue}) => {

    const {data: users, error, isLoading} = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: async () => axios.get("/api/users").then((res) => res.data),
        staleTime: 60 * 1000,
        retry: 3,
    });

    if (isLoading) return <Skeleton/>;

    if (error) return null;

    return (
        <Select.Root defaultValue={issue.assignedToUserId || "none"} onValueChange={(userId: string | null) => {
            if (userId === "none") userId = null;
            axios.patch("/api/issues/" + issue.id, {assigneeId: userId}).then(r => r);
        }}>
            <Select.Trigger placeholder={"Assign..."}/>
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    <Select.Item value={"none"}>Unassigned</Select.Item>
                    {users?.map((user) => (
                        <Select.Item key={user.id} value={user.id.toString()}>{user.name}</Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
}

export default AssigneeSelect;