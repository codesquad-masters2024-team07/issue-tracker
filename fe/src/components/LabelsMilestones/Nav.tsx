import { useContext } from "react";
import LabelsAndMilestoneUI from "../../common/UtilUI";
import { PlusOutlined } from "@ant-design/icons";
import { ModifyDeleteContext } from "../../Providers/ModifyDeleteProvider";

interface NavProps {
    location: string;
    labelsCount?: number;
    milestoneCount?: number;

}

const Nav = ({location, labelsCount, milestoneCount}: NavProps) => {

    const [, ModifyDeleteDispatch] = useContext(ModifyDeleteContext)
    
    return (
        <div className="flex justify-between">
            <LabelsAndMilestoneUI labelsCount={labelsCount} milestoneCount={milestoneCount}/>
            <button
                className="flex items-center border-none bg-blue-500 px-6 rounded-xl text-white text-xs w-[128px] justify-center"
                onClick={() => ModifyDeleteDispatch({type: "SET_CREATE", Payload: "create"})}
            >
                <PlusOutlined /> {location === "labels" ? "레이블 추가" : "마일스톤 추가"}
            </button>
        </div>
    );
};

export default Nav;
