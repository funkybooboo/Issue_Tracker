import LatestIssues from "@/app/LatestIssues";
import IssueSummary from "@/app/IssueSummary";
import prisma from "@/prisma/client";


const Dashboard = async () => {
    const open = await prisma.issue.count({where: {status: "OPEN"}});
    const inProgress = await prisma.issue.count({where: {status: "IN_PROGRESS"}});
    const closed = await prisma.issue.count({where: {status: "CLOSED"}});
    return (
        <>
            <IssueSummary closed={closed} inProgress={inProgress} open={open}/>
            <LatestIssues/>
        </>
    );
}

export default Dashboard;
