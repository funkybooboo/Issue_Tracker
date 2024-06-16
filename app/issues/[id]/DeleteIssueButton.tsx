'use client';

import {Button} from "@radix-ui/themes";

interface Props {
    id: number;
}

const DeleteIssueButton = ({ id }: Props) => {
    return (
        <Button color={"red"}>Delete Issue</Button>
    );
}

export default DeleteIssueButton;