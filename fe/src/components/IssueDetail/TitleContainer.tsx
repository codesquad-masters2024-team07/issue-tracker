import { useState } from "react";
import TitleView from "./TitleView";
import { IssueDetail, UserInfo } from "../../pages/IssueDetailPage";

export interface TitleContainerProps {
    issueData: IssueDetail | null;
    isOpen: boolean;
    productId: string | undefined;
    userInfo: UserInfo | null;
}

const TitleContainer = ({
    issueData,
    isOpen,
    productId,
    userInfo,
}: TitleContainerProps) => {
    const [editState, setEditState] = useState(false);

    return (
        <>
            <div>
                <TitleView
                    userInfo={userInfo}
                    issueData={issueData}
                    editState={editState}
                    setEditState={setEditState}
                    isOpen={isOpen}
                    productId={productId}
                />
            </div>
            <div className="border-[1px] my-6" />
        </>
    );
};

export default TitleContainer;
