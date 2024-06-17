import React, { useEffect, useState } from "react";
import { Issue } from "./IssueFeed";
import { Link } from "react-router-dom";
import { InfoCircleOutlined } from "@ant-design/icons";
import { getDateDifference } from "../../common/Utils";
import { FlagOutlined } from "@ant-design/icons";
interface IssueCardProps {
    curIssue: Issue;
    id: number;
    isLast: boolean;
    checkItemHandler: (id: string, isChecked: boolean) => void;
    isAllChecked: boolean;
    isOpen: boolean
}

const IssueCard = ({ curIssue, id, isLast, checkItemHandler, isAllChecked, isOpen }: IssueCardProps) => {
    const [isChecked, setChecked] = useState(false);
    
    const checkItemHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.currentTarget;
        setChecked(prev => !prev);
        checkItemHandler(id, checked);
    }

    useEffect(() => {
        setChecked(isAllChecked)
    }, [isAllChecked])

    return (
        <>
            <div
                key={id}
                className={`${
                    isLast ? "rounded-b-xl" : ""
                } h-[90px] flex border-t-2 border-gray-300 dark:bg-darkModeBorderBG`}
            >
                <div className="flex h-full w-[70%] items-center">
                    <input
                        type="checkbox"
                        id={String(id)}
                        checked={isChecked}
                        onChange={checkItemHandle}
                        className="w-[7%]"
                    />
                    <Link
                        to={`/issue/${id}`}
                        state={isOpen}
                        className="h-4/5"
                    >
                        <div className="w-full h-1/2 flex items-center">
                            <div className="mr-4 flex gap-2">
                                <InfoCircleOutlined />
                                <div className="text-lg font-medium">
                                    {curIssue.title}
                                </div>
                            </div>
                            {curIssue.labels.map((curLabel, idx) => (
                                <div key={idx} style={{
                                    backgroundColor: curLabel.backgroundColor,
                                    color: curLabel.textColor,
                                }}
                                className="px-2 rounded-2xl font-extralight text-sm mx-2">
                                    {curLabel.name}
                                </div>
                            ))}
                            
                        </div>
                        <div className="w-full h-1/2 flex items-center">
                            <div className="mr-2">#{curIssue.id}</div>
                            <div className="mr-4">
                                이 이슈가 {getDateDifference(curIssue.openAt)},{" "}
                                {curIssue.authorId}님에 의해 작성되었습니다.
                            </div>
                            <div>
                            <FlagOutlined /> {curIssue.milestoneTitle}
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="flex h-full w-[30%] items-center">
                    <div className="flex-grow"></div>
                </div>
            </div>
        </>
    );
};

export default IssueCard;
