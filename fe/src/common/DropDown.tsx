import { useEffect, useState } from "react";
import { APiUtil } from "./Utils";
import { PlusOutlined } from "@ant-design/icons";
import { TableType } from "../pages/NewPage";
import DropDownList from "./DropDownList";
import Progressbar from "./Progressbar";
import { UserImgBox } from "./UserImgBox";
import { SidebarLabel, SidebarMilestone, SidebarUser, SideBarItemsForm } from "../pages/NewPage";


interface DropDownProps {
    curTableItem: keyof TableType;
    idx: number;
    queryName: TableType[keyof TableType];
    sideBarItems: SideBarItemsForm
    handleListClick: (curData: SidebarLabel | SidebarMilestone | SidebarUser, tableName: string) => void;
    lastIdx: number;
    sideTable: { [key in TableType[keyof TableType]]: keyof SideBarItemsForm };
}

const DropDown = ({
    curTableItem,
    idx,
    queryName,
    sideBarItems,
    handleListClick,
    lastIdx,
    sideTable
}: DropDownProps) => {
    const [isOpen, setOpen] = useState(false);
    const [data, setData] = useState<(SidebarLabel | SidebarMilestone | SidebarUser)[]>([]);
    const [loading, setLoading] = useState(false);

    const toggleDropdown = () => setOpen(!isOpen);

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

    return (
        <li
            className={`${
                idx === lastIdx && "border-none"
            } p-6 border-b-2 border-gray-200 relative`}
        >
            <div
                onClick={toggleDropdown}
                key={idx}
                className="flex justify-between my-2"
            >
                <div>{curTableItem}</div>
                <PlusOutlined />
            </div>
            {(
                sideBarItems[sideTable[curTableItem]] as (SidebarLabel | SidebarMilestone | SidebarUser)[]
            ).map((curData, idx) => (
                <div key={idx} className="flex flex-col my-2">
                    {queryName === "labels" && (
                        <div className="flex">
                            <div
                                className="rounded-xl px-3"
                                style={{
                                    backgroundColor: (curData as SidebarLabel)
                                        .backgroundColor,
                                    color: (curData as SidebarLabel).textColor,
                                }}
                            >
                                {(curData as SidebarLabel).name}
                            </div>
                        </div>
                    )}
                    {queryName === "milestones" && (
                        <>
                            <Progressbar
                                open={(curData as SidebarMilestone).openIssueCount}
                                closed={(curData as SidebarMilestone).closedIssueCount}
                            />
                            <div className="text-right">
                                {(curData as SidebarMilestone).title}
                            </div>
                        </>
                    )}
                    {queryName === "users" && (
                        <div className="flex gap-2">
                            <UserImgBox
                                imgURL={(curData as SidebarUser).imgUrl}
                                margin="auto"
                                width="20px"
                                height="20px"
                            />
                            <p>{(curData as SidebarUser).id}</p>
                        </div>
                    )}
                </div>
            ))}
            {isOpen && (
                <DropDownList
                    setOpen={setOpen}
                    curTableItem={curTableItem}
                    data={data}
                    handleListClick={handleListClick}
                    queryName={queryName}
                    loading={loading}
                    sideBarItems={
                        sideBarItems[sideTable[curTableItem]] as (
                            | SidebarLabel
                            | SidebarMilestone
                            | SidebarUser
                        )[]
                    }
                />
            )}
        </li>
    );
};

export default DropDown;
