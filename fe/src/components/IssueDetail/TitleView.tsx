import { IssueDetail, UserInfo } from "../../pages/IssueDetailPage";
import { InfoCircleOutlined } from "@ant-design/icons";
import { getDateDifference } from "../../common/Utils";
import { useEffect, useState } from "react";
import TitleEditUi from "./TitleEditUi";
import TitleUi from "./TitleUi";
interface TitleViewProps {
    issueData: IssueDetail | null;
    editState: boolean;
    setEditState: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean
    productId: string | undefined
    userInfo: UserInfo | null
}

const TitleView = ({ userInfo, issueData, editState, setEditState, isOpen, productId}: TitleViewProps) => {
    const [title, setTitle] = useState("")

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

    useEffect(() => {
        if (issueData?.title) setTitle(issueData.title)
    }, [issueData]);
    return (
        <>
            <div>
                {editState ? (
                    <TitleEditUi title={title} handleTitleChange={handleTitleChange} setEditState={setEditState} productId={productId}/>
                ) : (
                    <TitleUi userInfo={userInfo} authorId={issueData?.authorId} title={issueData?.title} id={issueData?.id} setEditState={setEditState} isOpen={isOpen} productId={productId}/>
                )}
            </div>
            <div className="flex font-normal">
                <div className="w-[110px] h-[32px] border-none rounded-xl bg-blue-500 text-white flex items-center justify-center text-sm font-c">
                    <InfoCircleOutlined className="mr-1" />{" "}
                    {isOpen ? "열린" : "닫힌"} 이슈
                </div>
                <p className="flex items-center ml-2">
                    이 이슈가 {getDateDifference(issueData?.openAt)}{" "}
                    {issueData?.authorId}님에 의해 열렸습니다
                </p>
                <div className="flex items-center mx-2"> ∙ </div>
                <div className="flex items-center">
                    코맨트 {issueData?.commentCount}개
                </div>
            </div>
        </>
    );
};

export default TitleView;
