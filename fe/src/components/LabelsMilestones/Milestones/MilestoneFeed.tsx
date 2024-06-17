import { useState } from "react";
import { InfoCircleOutlined, CreditCardOutlined } from "@ant-design/icons";
import NotFound from "../../../common/NotFound";
import MilestoneCard from "./MilestoneCard";

export interface Milestone {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    state: string;
    updatedAt: string;
    openIssueCount: number;
    closedIssueCount: number;
}

interface MilestoneFeedProps {
    milestoneData: Milestone[];
}

export const MilestoneFeed = ({ milestoneData }: MilestoneFeedProps) => {
    const [isOpen, setOpen] = useState("OPEN");
    const isOpenInfo = milestoneData.filter(
        (curInfo) => curInfo.state === isOpen
    );
    const MilestoneLength = {
        open: milestoneData.filter((curIssue) => curIssue.state === "OPEN").length,
        closed: milestoneData.filter((curIssue) => curIssue.state === "CLOSED").length,
    };

    return (
        <section className="w-full border-2 border-gray-300 rounded-xl mt-4">
            <div className="h-[45px] bg-gray-200 transition-colors duration-500 dark:bg-darkModeBG flex text-sm rounded-t-lg">
                <div className="flex items-center gap-4 text-sm ml-4">
                    <button
                        className={`${isOpen === "OPEN" ? "font-bold" : ""}`}
                        onClick={() => setOpen("OPEN")}
                    >
                        <InfoCircleOutlined /> 열린 마일스톤(
                        {MilestoneLength.open})
                    </button>
                    <button
                        className={`${isOpen !== "OPEN" ? "font-bold" : ""}`}
                        onClick={() => setOpen("CLOSED")}
                    >
                        <CreditCardOutlined /> 닫힌 마일스톤(
                        {MilestoneLength.closed})
                    </button>
                </div>
            </div>
            {!isOpenInfo.length ? (
                <NotFound />
            ) : (
                isOpenInfo.map((curMilestone, idx) => (
                    <MilestoneCard
                        isOpen={isOpen}
                        curMilestone={curMilestone}
                        key={curMilestone.id}
                        isLastIdx={isOpenInfo.length - 1 === idx}
                    />
                ))
            )}
        </section>
    );
};
