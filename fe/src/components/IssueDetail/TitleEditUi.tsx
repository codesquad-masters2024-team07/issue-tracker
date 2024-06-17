import { EditOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APiUtil } from "../../common/Utils";
import { delay } from "../../common/Utils";
interface TitleEditUiProps {
    title: string;
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setEditState: React.Dispatch<React.SetStateAction<boolean>>;
    productId: string | undefined
}

interface MutationPayload {
    title: string;
    productId: string | undefined
}

const TITLE_EDIT_DELAY = 500

const TitleEditUi = ({title, handleTitleChange, setEditState, productId}: TitleEditUiProps) => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: async ({ title, productId }: MutationPayload) => {
            await APiUtil.modifyData("issues", {title: title}, productId);
            
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["issueDetail", productId]});
        },
    });
    
    const handleClickModify = async() => {
        mutate({title, productId})
        await delay(TITLE_EDIT_DELAY)
        setEditState(false)
    }
    return (
        <div className="flex items-center justify-between">
            <div className="flex py-2 border rounded-xl bg-gray-200">
                <div className=" text-sm mx-6">제목</div>
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    className="bg-gray-200 w-[850px] h-full outline-none"
                    placeholder="제목을 입력하세요"
                />
            </div>
            <div className="w-[304px] h-[68px] flex gap-4 items-center justify-end text-blue-400">
                <button
                    onClick={() => setEditState(false)}
                    className="w-[40%] h-[70%] flex items-center border-2 border-blue-400 rounded-xl text-sm justify-center"
                >
                    X 편집 취소
                </button>
                <button
                    onClick={handleClickModify}
                    className="w-[40%] h-[70%] flex items-center border-2 border-blue-400 rounded-xl text-sm justify-center"
                >
                    <EditOutlined /> 편집 완료
                </button>
            </div>
        </div>
    );
};

export default TitleEditUi;
