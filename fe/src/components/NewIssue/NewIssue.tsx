import { useState } from "react";
import { NewIssueForm } from "../../pages/NewPage";
import CommentBox from "../../common/CommentBox";
interface CommentProps {
    issueData: NewIssueForm;
    setIssueData: React.Dispatch<React.SetStateAction<NewIssueForm>>;
}

const NewIssue = ({ issueData, setIssueData }: CommentProps) => {
    const [isActive, setActive] = useState(false);

    const handleFocus = () => setActive(true);
    const handleBlur = () => setActive(false);
    const addCommentText = (comment: string) => {
        setIssueData(prev => ({
            ...prev,
            content: comment,
        }))
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="">
                <div
                    className={`${
                        isActive ? "bg-white border-black border-2" : ""
                    } w-full bg-gray-200 dark:bg-darkModeBorderBG rounded-xl p-1 pl-2`}
                >
                    <div className="text-sm font-normal opacity-60">제목</div>
                    <input
                        type="text"
                        name="title"
                        className={`${
                            isActive ? "bg-white" : ""
                        } bg-gray-200 dark:bg-darkModeBorderBG h-full w-full outline-none rounded-xl`}
                        onFocus={() => handleFocus()}
                        onBlur={() => handleBlur()}
                        value={issueData.title}
                        onChange={(e) =>
                            setIssueData({
                                ...issueData,
                                title: e.target.value,
                            })
                        }
                    />
                </div>
            </div>
            <div>
                <CommentBox height={"h-[400px]"} addCommentText={addCommentText}/>
            </div>
        </div>
    );
};

export default NewIssue;
