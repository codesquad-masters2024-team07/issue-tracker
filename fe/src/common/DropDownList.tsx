import { DownCircleOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { UserImgBox } from "./UserImgBox";
import { SidebarLabel, SidebarMilestone, SidebarUser } from "../pages/NewPage";
import CircleIcon from '../assets/free-icon-circle-3962612.png';

interface DropDownListProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    curTableItem: string;
    data: (SidebarLabel | SidebarMilestone | SidebarUser)[];
    handleListClick: (curData: SidebarLabel | SidebarMilestone | SidebarUser, tableName: string) => void;
    queryName: string;
    loading: boolean;
    sideBarItems: (SidebarLabel | SidebarMilestone| SidebarUser)[];
}

const DropDownList = ({
    setOpen,
    curTableItem,
    data,
    handleListClick,
    queryName,
    loading,
    sideBarItems,
}: DropDownListProps) => {

    const clickList = (curData: SidebarLabel | SidebarMilestone | SidebarUser, curTableItem: string) => {
        handleListClick(curData, curTableItem);
        setOpen(false);
    };
    
    return (
        <div className="absolute bg-gray-100 dark:bg-darkModeBorderBG border border-gray-200 shadow-md z-10 mt-1 w-[230px] flex flex-col rounded-xl overflow-hidden">
            <div className="m-2 ml-4 text-sm">{curTableItem} 설정</div>
            {loading && (
                <Spin size="small">
                    <div className="p-8 bg-gray-200"></div>
                </Spin>
            )}
            {data.length > 0 &&
                data.map((curData, idx) => (
                    <div
                        key={idx}
                        onClick={() => clickList(curData, curTableItem)}
                        className={`${sideBarItems.find((item) => item.id === curData.id) && "font-bold"} flex-grow border-t-2 border-gray-200 px-6 flex items-center h-10 text-sm justify-between bg-white dark:bg-darkModeBorderBG`}
                    >
                        
                        {queryName === "labels" && (
                            <div className="flex items-center gap-2">
                                <div
                                    style={{
                                        width: "15px",
                                        height: "15px",
                                        borderRadius: "50%",
                                        backgroundColor:
                                            (curData as SidebarLabel).backgroundColor,
                                    }}
                                />
                                <div>{(curData as SidebarLabel).name}</div>
                            </div>
                        )}
                        {queryName === "milestones" && (
                            <div>{(curData as SidebarMilestone).title}</div>
                        )}
                        {queryName === "users" && (
                            <div className="flex gap-2">
                                <UserImgBox imgURL={(curData as SidebarUser).imgUrl} margin="auto" width="20px" height="20px"/>
                                <p>{(curData as SidebarUser).id}</p>
                            </div>
                        )}
                        {sideBarItems.find((item) => item.id === curData.id) ? (
                            <DownCircleOutlined />
                        ) : (
                            <img src={CircleIcon} alt="Circle Icon" className="w-[14px] h-[14px]"/>
                        )}
                    </div>
                ))}
        </div>
    );
};

export default DropDownList;
