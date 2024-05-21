import { Comment } from "./TitleContainer";
import { FlagOutlined, SmileOutlined } from "@ant-design/icons";
interface CommentProps {
    commentInfo: Comment;
}

export const CommentCard = ({ commentInfo }: CommentProps) => {
    return (
        <div className="min-h-[120px] w-[960px] border-2 rounded-xl mb-6 flex flex-col">
            <div className="flex justify-between h-[64px] border-b-2 px-6 items-center">
                <div className="flex gap-2">
                    <div>{commentInfo.authorId}</div>
                    <div className="font-light">{commentInfo.createdAt}</div>
                </div>
                <div className="flex gap-2 text-sm font-medium">
                    {/* // 작성자 넣기 */}
                    <button><FlagOutlined/> 편집</button>
                    <button><SmileOutlined/> 반응</button>
                </div>
            </div>
            {commentInfo && 
            <div className="h-full bg-white rounded-b-xl">
                <p className="m-4">{commentInfo.contents}</p>
            </div>
            }
        </div>
    );
};
