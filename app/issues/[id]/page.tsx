import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import EditIssueButton from "@/app/issues/[id]/EditIssueButton";
import IssueDetails from "@/app/issues/[id]/IssueDetails";

interface Props {
    params: { id: string; }
}

const IssueDetailPage = async ({params}: Props) => {

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    });

    if (!issue) {
        notFound();
    }

    return (
        <>
            <IssueDetails issue={issue}/>
            <EditIssueButton id={issue.id}/>
        </>
    );
}

export default IssueDetailPage;