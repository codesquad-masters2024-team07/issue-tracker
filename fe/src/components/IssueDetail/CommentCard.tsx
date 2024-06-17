import { FlagOutlined, SmileOutlined } from "@ant-design/icons";
import { APiUtil, getDateDifference, openNotification } from "../../common/Utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Comment, UserInfo } from "../../pages/IssueDetailPage";
import { useState } from "react";
import CommentBox from "../../common/CommentBox";
import { EditOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
interface CommentProps {
    commentInfo: Comment;
    userInfo: UserInfo | null;
    authorId: string | undefined;
    productId: string | undefined
}

export const CommentCard = ({
    commentInfo,
    userInfo,
    authorId,
    productId
}: CommentProps) => {
    const queryClient = useQueryClient();
    const [editState, setEditState] = useState(false);
    const [detailComment, setComment] = useState(commentInfo.contents);
    const addCommentText = (comment: string) => setComment(comment);
    const handleEditClick = (commentAuthorId: string) => {
        if (userInfo?.id !== commentAuthorId) return openNotification("내가 작성한 댓글만 편집할 수 있습니다.");
        setEditState(true);
    };

    const { mutate } = useMutation({
        mutationFn: async () => {
                await APiUtil.ModifyPatch(`comments/${commentInfo.id}`, {content: detailComment});
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["issueDetail", productId]});
        },
    });

    const handleModify = () => {
        mutate()
        setEditState(false)
    }
    return (
        <>
            <div className="min-h-[120px] w-[960px] border-2 rounded-xl mb-6 flex flex-col">
                <div className="flex justify-between h-[64px] border-b-2 px-6 items-center">
                    <div className="flex gap-2">
                        <div>{commentInfo.authorId}</div>
                        <div className="font-light">
                            {getDateDifference(commentInfo.createdAt)}
                        </div>
                    </div>
                    <div className="flex gap-2 text-sm font-medium">
                        {authorId === commentInfo.authorId && (
                            <div className="border-2 border-gray-200 rounded-xl px-2 bg-gray-200 font-light">
                                작성자
                            </div>
                        )}
                        <button
                            onClick={() =>
                                handleEditClick(commentInfo.authorId)
                            }
                        >
                            <FlagOutlined /> 편집
                        </button>
                        <button>
                            <SmileOutlined /> 반응
                        </button>
                    </div>
                </div>
                {!editState ? (
                    <div className="h-full bg-white rounded-b-xl dark:bg-darkModeBorderBG">
                        <ReactMarkdown
                            className="m-4"
                            remarkPlugins={[remarkGfm]}
                        >
                            {commentInfo.contents}
                        </ReactMarkdown>
                    </div>
                ) : (
                    <CommentBox
                        height=""
                        addCommentText={addCommentText}
                        detailComment={detailComment}
                    />
                )}
            </div>
            {editState && (
                <div className="flex justify-end gap-2 mb-6">
                    <button
                        onClick={() => setEditState(false)}
                        className={` flex justify-center items-center px-6 rounded-xl text-sm h-[40px] w-[140px] border-blue-500 border-2 text-blue-500`}
                    >
                        X 편집 취소
                    </button>
                    <button
                        onClick={() => handleModify()}
                        className={` flex justify-center items-center border-none bg-blue-500 px-6 rounded-xl text-white text-sm h-[40px] w-[140px]`}
                    >
                        <EditOutlined /> 편집 완료
                    </button>
                </div>
            )}
        </>
    );
};