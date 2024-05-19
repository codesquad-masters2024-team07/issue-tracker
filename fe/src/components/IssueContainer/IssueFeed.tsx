import FeedNav from "./FeedNav";
import IssueCard from "./IssueCard";

export interface Issue {
    id: number;
    author: string;
    title: string;
    contents: string;
    created_at: string;
    updated_at: string;
    closed_at: string | null;
    milestone_id: number | null;
    is_open: boolean;
    is_deleted: boolean;
}

export interface IssueFeedProps {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    issueInfo: Issue[];
    resetFilterUI: boolean;
    setResetFilterUI: React.Dispatch<React.SetStateAction<boolean>>;
    handleResetFilterUI?: () => void;
}

const IssueFeed: React.FC<IssueFeedProps> = ({
    isOpen,
    setOpen,
    issueInfo,
    resetFilterUI,
    setResetFilterUI,
    handleResetFilterUI,
}) => {
    return (
        <section className="w-full border-2 border-gray-300 rounded-xl mt-4">
            <FeedNav
                isOpen={isOpen}
                setOpen={setOpen}
                issueInfo={issueInfo}
                resetFilterUI={resetFilterUI}
                setResetFilterUI={setResetFilterUI}
                handleResetFilterUI={handleResetFilterUI}
            />
            <IssueCard isOpen={isOpen} issueInfo={issueInfo} />
        </section>
    );
};

export default IssueFeed;