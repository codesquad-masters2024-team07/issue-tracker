import React from "react";
import { InfoCircleOutlined, CreditCardOutlined } from "@ant-design/icons";
import IssueStatusFilter from "./IssueStatusFilter";
import FeedFilter from "./FeedFilter";

export interface FeedFilterType {
    담당자: string;
    레이블: string;
    마일스톤: string;
    작성자: string;
}

const FEED_FILTER: FeedFilterType = {
    담당자: "users",
    레이블: "labels",
    마일스톤: "milestones",
    작성자: "users",
};

interface FeedNavProps {
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    resetFilterUI: boolean;
    setResetFilterUI: React.Dispatch<React.SetStateAction<boolean>>;
    isAllChecked: boolean;
    allCheckHandler: () => void;
    checkedItem: string[];
    setCheckItem: React.Dispatch<React.SetStateAction<string[]>>
    setIsAllChecked: React.Dispatch<React.SetStateAction<boolean>>
    openIssueCount: number;
    closedIssueCount: number;
}

const FeedNav = ({
    setQuery,
    isOpen,
    setOpen,
    resetFilterUI,
    setResetFilterUI,
    isAllChecked,
    allCheckHandler,
    checkedItem,
    setCheckItem,
    setIsAllChecked,
    openIssueCount,
    closedIssueCount,
}: FeedNavProps) => {
    return (
        <div className="h-[45px] bg-gray-200 dark:bg-darkModeBG flex text-sm rounded-t-lg">
            <div className="flex h-full w-[70%] items-center">
                <input
                    type="checkbox"
                    checked={isAllChecked}
                    onChange={allCheckHandler}
                    className="w-[7%]"
                />
                {checkedItem.length ? (
                    <div>{checkedItem.length}개 이슈 선택</div>
                ) : (
                    <div>
                        <button
                            className={`mr-6 ${isOpen && "font-bold"}`}
                            onClick={() => {
                                setOpen(true);
                                setQuery("issues?state=OPEN");
                            }}
                        >
                            <InfoCircleOutlined /> 열린 이슈({openIssueCount})
                        </button>
                        <button
                            className={`${!isOpen && "font-bold"}`}
                            onClick={() => {
                                setOpen(false);
                                setQuery("issues?state=CLOSED");
                            }}
                        >
                            <CreditCardOutlined /> 닫힌 이슈({closedIssueCount})
                        </button>
                    </div>
                )}
            </div>
            <div className="flex h-full w-[30%] items-center z-10">
                {checkedItem.length ? (
                    <IssueStatusFilter checkedItem={checkedItem} setCheckItem={setCheckItem} setIsAllChecked={setIsAllChecked}/>
                ) : (
                    Object.keys(FEED_FILTER).map((key) => (
                        <FeedFilter
                            key={key}
                            queryName={FEED_FILTER[key as keyof FeedFilterType]}
                            filterType={key}
                            resetFilterUI={resetFilterUI}
                            setResetFilterUI={setResetFilterUI}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default FeedNav;
