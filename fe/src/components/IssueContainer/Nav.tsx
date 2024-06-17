import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import FilterUI from "./FilterUI";
import { FilterContext } from "../../Providers/FilterProvider";
import React, { ChangeEvent, useContext } from "react";
import LabelsAndMilestoneUI from "../../common/UtilUI";

interface NavProps {
    resetFilterUI: boolean;
    setResetFilterUI: React.Dispatch<React.SetStateAction<boolean>>;
    handleResetFilterUI: () => void;
    labelCount: number
    openMilestoneCount: number
}

const ISSUES_FILTER = [
    { value: "열린 이슈", query: "is_open=true" },
    { value: "내가 작성한 이슈", query: "author=@me" },
    { value: "나에게 할당된 이슈", query: "is=pr" },
    { value: "내가 댓글을 남긴 이슈", query: "assignee=@me" },
    { value: "닫힌 이슈", query: "is_open=false" },
];

const Nav = ({ resetFilterUI, setResetFilterUI, handleResetFilterUI, labelCount, openMilestoneCount}: NavProps) => {

    const [FilterState, FilterDispatch] = useContext(FilterContext);
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        FilterDispatch({type: "SEARCH", selectFilter: event.target.value})
    };

    return (
        <div>
            <div className="flex items-center justify-between h-[36px]">
                <div className="flex items-center w-[594px] h-full">
                    <div className="border-l-2 border-t-2 border-b-2 rounded-l-lg border-gray-300 h-full w-1/5 flex items-center">
                        <FilterUI  filterInfo={ISSUES_FILTER} filterType={"필터"} resetFilterUI={resetFilterUI} setResetFilterUI={setResetFilterUI}/>
                    </div>
                    <div className="bg-gray-200 dark:bg-darkModeBorderBG flex border-2 rounded-r-lg border-gray-300 overflow-hidden h-full w-4/5 px-4 gap-2">
                        <SearchOutlined/>
                        <input
                            className="bg-gray-200 dark:bg-darkModeBorderBG w-full outline-none "
                            type="text"
                            value={FilterState.req_query}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                    <div className="flex gap-2">
                        <LabelsAndMilestoneUI labelsCount={labelCount} milestoneCount={openMilestoneCount}/>
                        <Link
                            to="/new"
                            className="flex items-center border-none bg-blue-500 px-6 rounded-xl text-white text-xs w-[128px] justify-center"
                        >
                            <PlusOutlined /> 이슈 작성
                        </Link>
                    </div>
                </div>
                {FilterState.req_query !== "is_open=true" && (
                    <button className="mt-4" onClick={handleResetFilterUI}>
                        X 현재의 검색 필터 및 정렬 지우기
                    </button>
                )}
            </div>
    );
};

export default Nav;
