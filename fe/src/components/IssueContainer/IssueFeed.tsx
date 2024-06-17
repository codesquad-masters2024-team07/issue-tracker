import { useEffect, useState } from "react";
import FeedNav from "./FeedNav";
import IssueCard from "./IssueCard";
import NotFound from "../../common/NotFound";

export interface Issue {
    id: number;
    authorId: string;
    title: string;
    openAt: string;
    milestoneTitle: string;
    assignees: string[]
    labels: Labels[]
}

interface Labels {
    backgroundColor: string;
    name: string;
    textColor: string;
}

interface IssueInfo {
    issues: Issue[];
    openIssueCount: number;
    closedIssueCount: number;
    labelCount: number;
    openMilestoneCount: number;
}

export interface IssueFeedProps {
    setQuery: React.Dispatch<React.SetStateAction<string>>
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    issueInfo: IssueInfo;
    resetFilterUI: boolean;
    setResetFilterUI: React.Dispatch<React.SetStateAction<boolean>>;
}

const  IssueFeed = ({
    setQuery,
    isOpen,
    setOpen,
    issueInfo,
    resetFilterUI,
    setResetFilterUI,
}: IssueFeedProps) => {

    const [checkedItem, setCheckItem] = useState<string[]>([]);
    const [isAllChecked, setIsAllChecked] = useState(false);

    const checkItemHandler = (id: string, isChecked: boolean) => {
        if (isChecked) {
            setCheckItem((prev) => [...prev, id]);
        } else {
            setCheckItem((prev) => prev.filter((curItem) => id !== curItem));
        }
    };

    const allCheckHandler = () => {
        setIsAllChecked(prev => !prev);
        
        if(!isAllChecked) {
            setCheckItem(issueInfo.issues.map(curIssue => String(curIssue.id)));
        } else {
            setCheckItem([])
        }
    }
    
    useEffect(() => {
        setIsAllChecked(false);
        setCheckItem([])
    }, [isOpen])

    return (
        <section className="w-full border-2 border-gray-300 rounded-xl mt-4">
            <FeedNav
                setQuery={setQuery}
                isOpen={isOpen}
                setOpen={setOpen}
                resetFilterUI={resetFilterUI}
                setResetFilterUI={setResetFilterUI}
                isAllChecked={isAllChecked}
                allCheckHandler={allCheckHandler}
                checkedItem={checkedItem}
                setCheckItem={setCheckItem}
                setIsAllChecked={setIsAllChecked}
                openIssueCount={issueInfo.openIssueCount}
                closedIssueCount={issueInfo.closedIssueCount}
            />
            {!issueInfo.issues.length ? <NotFound/> : issueInfo.issues.map((curIssue, idx) => (
                <IssueCard
                    key={curIssue.id}
                    curIssue={curIssue}
                    id={curIssue.id}
                    isLast={issueInfo.issues.length - 1 === idx}
                    checkItemHandler={checkItemHandler}
                    isAllChecked={isAllChecked}
                    isOpen={isOpen}
                />
            ))}
        </section>
    );
};

export default IssueFeed;
