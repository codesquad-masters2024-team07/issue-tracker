import { Link, useLocation } from "react-router-dom";
import { TagOutlined, FlagOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { UserImgBox } from "./UserImgBox";

interface LabelsAndMilestoneUIProps {
    labelsCount?: number
    milestoneCount?: number
}

export const Header = () => {
    const [userImg, setUserImg] = useState<string>("")
    useEffect(() => {
        const userInfo = sessionStorage.getItem("user") 
        if(userInfo){
            const parseUserInfo = JSON.parse(userInfo)
            setUserImg(parseUserInfo.imgUrl)
        }
    }, [])
    return (
        <header className="pb-10 flex justify-between">
            <Link to="/issue" className="text-3xl font-style: italic font-normal flex items-center">
                Issue Tracker
            </Link>
            <UserImgBox imgURL={userImg} margin="0 0 0 auto" width="50px" height="50px"/>
        </header>
    );
};


const LabelsAndMilestoneUI = ({labelsCount, milestoneCount}:LabelsAndMilestoneUIProps) => {

    const location = useLocation();
    
    return (
        <div className="flex items-center">
            <Link
                to="/labels"
                className={`${
                    location.pathname === "/labels"
                        ? "bg-gray-200 font-bold"
                        : ""
                } w-32 border-l-2 border-t-2 border-b-2 rounded-l-lg border-gray-300 dark:bg-darkModeBorderBG py-1 text-center`}
            >
                <TagOutlined /> 레이블 ({labelsCount})
            </Link>
            <Link
                to="/milestones"
                className={`${
                    location.pathname === "/milestones"
                        ? "bg-gray-200 font-bold"
                        : ""
                } w-32 border-2 rounded-r-lg border-gray-300 dark:bg-darkModeBorderBG py-1 text-center`}
            >
                <FlagOutlined /> 마일스톤 ({milestoneCount})
            </Link>
        </div>
    );
};

export default LabelsAndMilestoneUI;
