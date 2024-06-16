import {Card, Flex, Heading, Text} from "@radix-ui/themes";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";
import { Issue } from "@prisma/client";

interface Props {
    issue: Issue;
}

const IssueDetails = ({issue}: Props) => {
    return (
        <>
            <Heading>{issue.title}</Heading>
            <Flex className={"space-x-3"} my={"2"}>
                <IssueStatusBadge status={issue.status}/>
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className={"prose"} mt={"4"}>
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </>
    );
}

export default IssueDetails;