import { CalendarOutlined, FlagOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APiUtil, delay, openNotification } from "../../common/Utils";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../../pages/IssueDetailPage";

const DELAY_TIME = 2000;
interface TitleUiProps {
    userInfo: UserInfo | null;
    authorId: string | undefined;
    title: string | undefined;
    id: number | undefined;
    setEditState: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;
    productId: string | undefined;
}
export interface TitleForm {
    issueIds: number[];
    state: string;
}
const TitleUi = ({
    userInfo,
    authorId,
    title,
    id,
    setEditState,
    isOpen,
    productId,
}: TitleUiProps) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: async (form: TitleForm) => {
            await APiUtil.ModifyPatch("issues", form);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["issueDetail", productId],
            });
        },
    });
    const handleClose = async () => {
        const modifyStateForm: TitleForm = {
            issueIds: id ? [id] : [],
            state: isOpen ? "CLOSED" : "OPEN",
        };
        mutate(modifyStateForm);
        await delay(DELAY_TIME);
        navigate("/issue");
    };

    const handleEditClick = () => {
        if (userInfo?.id !== authorId)
            return openNotification("작성자만 편집할 수 있습니다.");
        setEditState(true);
    };
    return (
        <div className="flex items-center justify-between">
            <header className="flex text-4xl h-full">
                <h1>{title}</h1>
                <div className="ml-2 font-thin text-2xl m-auto">#{id}</div>
            </header>
            <div className="w-[304px] h-[68px] flex gap-4 items-center justify-end text-blue-400">
                <button
                    onClick={handleEditClick}
                    className="w-[40%] h-[70%] flex items-center border-2 border-blue-400 rounded-xl text-sm justify-center"
                >
                    <FlagOutlined /> 제목 편집
                </button>
                <button
                    onClick={() => handleClose()}
                    className="w-[40%] h-[70%] flex items-center border-2 border-blue-400 rounded-xl text-sm justify-center"
                >
                    <CalendarOutlined /> {isOpen ? "이슈 닫기" : "이슈 열기"}
                </button>
            </div>
        </div>
    );
};

export default TitleUi;
