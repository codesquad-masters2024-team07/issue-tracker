import CommentBox from "../../common/CommentBox";
import { CommentCard } from "./CommentCard";
import { UserInfo } from "../../pages/IssueDetailPage";
import { useState } from "react";
import { IssueDetail } from "../../pages/IssueDetailPage";
import { APiUtil } from "../../common/Utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
interface CommentAreaProps {
    detailData: IssueDetail;
    authorId: string | undefined;
    userInfo: UserInfo | null;
    productId: string | undefined
}
export interface CommentCreateForm {
    authorId: string | undefined;
    contents: string;
}


const CommentArea = ({ detailData, authorId, userInfo, productId }: CommentAreaProps) => {
    const queryClient = useQueryClient();
    const [detailComment, setComment] = useState("");
    const addCommentText = (comment: string) => setComment(comment);
    const authorCommentInfo = {
        authorId: detailData.authorId,
        contents: detailData.content,
        createdAt: detailData.openAt,
        updatedAt: detailData.updatedAt,
    };

    const { mutate } = useMutation({
        mutationFn: async (createForm: CommentCreateForm) => await APiUtil.createData(`issues/${detailData.id}/comments`, createForm),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["issueDetail", productId]});
        },
    });

    const handleCreate = async() => {
        const createForm = {authorId: userInfo?.id, contents: detailComment}
        mutate(createForm)
    }
    return (
        <div className="h-full">
            <CommentCard commentInfo={authorCommentInfo} userInfo={userInfo} authorId={authorId} productId={productId}/>
            {detailData?.comments.length ? (
                detailData.comments.map((curData, idx) => (
                    <CommentCard
                        key={idx}
                        commentInfo={curData}
                        userInfo={userInfo}
                        authorId={authorId}
                        productId={productId}
                    />
                ))
            ) : (
                <div className="w-[960px]" />
            )}
            <CommentBox
                height="h-[200px]"
                addCommentText={addCommentText}
                detailComment={detailComment}
            />
            <button
                onClick={() => handleCreate()}
                disabled={detailComment === ""}
                className={`${
                    detailComment === "" && "bg-gray-200"
                } flex justify-center items-center border-none bg-blue-500 px-6 rounded-xl text-white text-sm h-[46px] w-[200px] ml-auto my-4`}
            >
                완료
            </button>
        </div>
    );
};

export default CommentArea;
