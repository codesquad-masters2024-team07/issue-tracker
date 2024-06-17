import { SideBarItemsForm } from "../pages/NewPage";
import DropDown from "./DropDown";
import { TableType } from "../pages/NewPage";
import { SidebarLabel, SidebarMilestone, SidebarUser } from "../pages/NewPage";

interface SidebarProps {
    sideBarItems: SideBarItemsForm;
    handleListClick: (
        curData: SidebarLabel | SidebarMilestone | SidebarUser,
        tableName: string
    ) => void;
    sideTable: { [key in TableType[keyof TableType]]: keyof SideBarItemsForm };
}

const sidebarQuery: TableType = {
    담당자: "users",
    레이블: "labels",
    마일스톤: "milestones",
};

const Sidebar = ({
    sideBarItems,
    handleListClick,
    sideTable,
}: SidebarProps) => {
    return (
        <ul className="w-[288px] border-2 bg-white rounded-xl border-gray-200 h-full dark:bg-darkModeBorderBG relative">
            {Object.keys(sidebarQuery).map((curTableItem, idx) => (
                <DropDown
                    key={idx}
                    curTableItem={curTableItem as keyof TableType}
                    idx={idx}
                    queryName={sidebarQuery[curTableItem as keyof TableType]}
                    sideBarItems={sideBarItems}
                    handleListClick={handleListClick}
                    lastIdx={Object.keys(sidebarQuery).length - 1}
                    sideTable={sideTable}
                />
            ))}
        </ul>
    );
};

export default Sidebar;
