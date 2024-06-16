import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import EditIssueButton from "@/app/issues/[id]/EditIssueButton";
import IssueDetails from "@/app/issues/[id]/IssueDetails";
import DeleteIssueButton from "@/app/issues/[id]/DeleteIssueButton";
import {Box, Flex, Grid} from "@radix-ui/themes";

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
        <Grid columns={{initial: '1', sm: '5'}} gap={"5"}>
            <Box className={"md:col-span-4"}>
                <IssueDetails issue={issue}/>
            </Box>
            <Box>
                <Flex direction={"column"} gap={"4"}>
                    <EditIssueButton id={issue.id}/>
                    <DeleteIssueButton id={issue.id}/>
                </Flex>
            </Box>
        </Grid>
    );
}

export default IssueDetailPage;