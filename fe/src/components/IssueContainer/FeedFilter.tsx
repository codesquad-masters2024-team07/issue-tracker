import React, { useContext, useEffect, useRef, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { SidebarLabel, SidebarMilestone, SidebarUser } from "../../pages/NewPage";
import { APiUtil } from "../../common/Utils";
import DropDownList from "../../common/DropDownList";
import { FeedFilterType } from "./FeedNav";
import { FilterContext } from "../../Providers/FilterProvider";

interface FeedFilterProps {
    queryName: string;
    filterType: string;
    resetFilterUI: boolean
    setResetFilterUI: React.Dispatch<React.SetStateAction<boolean>>
}

const QUERY_TABLE: FeedFilterType = {
    담당자: "assignee:",
    레이블: "label:",
    마일스톤: "milestone:",
    작성자: "author:",
}

const FeedFilter = ({queryName, filterType, resetFilterUI, setResetFilterUI}: FeedFilterProps) => {
    const [, FilterDispatch] = useContext(FilterContext);
    const [isOpen, setIsOpen] = useState(false);
    const [selectItem, setSelectItem] = useState<(SidebarLabel | SidebarMilestone | SidebarUser)[]>([]);
    const [data, setData] = useState<(SidebarLabel | SidebarMilestone | SidebarUser)[]>([])
    const [isLoading, setLoading] = useState(false)
    const dropdownRef = useRef<HTMLButtonElement | null>(null);
    useEffect(() => {
        const handleClickOutside = async(event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    useEffect(() => {
        if (resetFilterUI) setSelectItem([]);
        setResetFilterUI(false);
        FilterDispatch({ type: "SET_INIT", selectFilter: ""});
    }, [resetFilterUI, FilterDispatch, setResetFilterUI]);


    useEffect(() => {
        const fetchData = async () => {
            if (isOpen) {
                setLoading(true);
                try {
                    const filterInfo = await APiUtil.getData(queryName);
                    if (
                        queryName === "labels" &&
                        filterInfo &&
                        filterInfo.labelResponses
                    ) {
                        setData(filterInfo.labelResponses);
                    } else if (
                        queryName === "milestones" &&
                        filterInfo &&
                        filterInfo.milestones
                    ) {
                        setData(filterInfo.milestones);
                    } else {
                        setData(filterInfo);
                    }
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [isOpen, queryName]);

    const toggleDropdown = () => setIsOpen(!isOpen)

    const handleListClick = async (curData: SidebarLabel | SidebarMilestone | SidebarUser, curTableItem: string) => {
        const isItemSelected = selectItem.find((item) => item.id === curData.id);
        const query = curTableItem === "레이블" 
        ? curData.name 
        : curTableItem === "마일스톤" 
        ? curData.title 
        : curData.id;

        if (isItemSelected) {
            FilterDispatch({ type: "REMOVE_TASK_FILTER", selectFilter: `${QUERY_TABLE[curTableItem as keyof FeedFilterType]}${query}` });
            setSelectItem((prev) => prev.filter((item) => item.id !== curData.id));
        } else {
            FilterDispatch({ type: "ADD_TASK_FILTER", selectFilter: `${QUERY_TABLE[curTableItem as keyof FeedFilterType]}${query}` });
            setSelectItem((prev) => [...prev, curData]);
        }
    };

    return (
        <button
            onClick={toggleDropdown}
            className="relative text-sm font-normal h-full w-full"
            ref={dropdownRef}
        >
            <div className="flex justify-evenly h-full items-center">
                <div>{filterType}</div>
                <DownOutlined />
            </div>
            {isOpen && (
                <DropDownList
                    setOpen={setIsOpen}
                    curTableItem={filterType}
                    data={data}
                    handleListClick={handleListClick}
                    queryName={queryName}
                    loading={isLoading}
                    sideBarItems={
                        selectItem as (
                            | SidebarLabel
                            | SidebarMilestone
                            | SidebarUser
                        )[]
                    }
                />
            )}
        </button>
    );
};

export default FeedFilter;
