import NotFound from "../../../common/NotFound";
import LabelCard from "./LabelCard";


export interface Label {
    id: number;
    name: string;
    description: string;
    textColor: string;
    backgroundColor: string;
    labelCount: number;
    milestoneCount: number;
}
interface LabelFeedProps {
    labelsInfo: Label[];
    labelsCount: number
}

export const LabelFeed = ({ labelsInfo, labelsCount }: LabelFeedProps) => {
    const labelsLength = labelsInfo.length;
    return (
        <section className="w-full border-2 border-gray-300 rounded-xl mt-4">
            <div className="h-[45px] bg-gray-200 transition-colors duration-500 dark:bg-darkModeBG flex text-sm rounded-t-lg">
                <div className="pl-6 font-bold flex items-center">{labelsCount}개의 레이블</div>
            </div>
            {!labelsLength ? (
                <NotFound />
            ) : (
                labelsInfo.map((curLabel, idx) => (
                <LabelCard
                    curLabel={curLabel}
                    key={curLabel.id}
                    isLast={labelsInfo.length - 1 === idx}
                />
                ))
            )}
        </section>
    );
};
