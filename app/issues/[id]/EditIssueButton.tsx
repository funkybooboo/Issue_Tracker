'use client';

import {Button} from "@radix-ui/themes";
import {Pencil2Icon} from "@radix-ui/react-icons";
import Link from "next/link";

interface Props {
    id: number;
}

const EditIssueButton = ({id}: Props) => {
    return (
        <Button>
            <Pencil2Icon/>
            <Link href={`/issues/${id}/edit`}>Edit Issue</Link>
        </Button>
    );
};

export default EditIssueButton;