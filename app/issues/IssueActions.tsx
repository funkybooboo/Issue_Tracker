import {Button, Flex} from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "@/app/issues/IssueStatusFilter";

const IssueActions = () => {
    return (
        <Flex justify={"between"}>
            <Button>
                <Link href={"/issues/new"}>New Issue</Link>
            </Button>
            <IssueStatusFilter/>
        </Flex>
    );
}

export default IssueActions;