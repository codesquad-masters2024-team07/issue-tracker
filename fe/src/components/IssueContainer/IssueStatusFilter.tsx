import { useState } from "react";
import {
    DownOutlined,
    MinusCircleOutlined,
} from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APiUtil } from "../../common/Utils";

export interface StatusModify {
    issueIds: string[],
    state: string
}
interface IssueStatusFilterProps {
    checkedItem: string[]
    setCheckItem: React.Dispatch<React.SetStateAction<string[]>>
    setIsAllChecked: React.Dispatch<React.SetStateAction<boolean>>
}

const filterType = [
    { type: "선택한 이슈 열기", value: "OPEN" },
    { type: "선택한 이슈 닫기", value: "CLOSED" },
];

const IssueStatusFilter = ({checkedItem, setCheckItem, setIsAllChecked}: IssueStatusFilterProps) => {
    const [isOpen, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: async (form: StatusModify) => {
            await APiUtil.ModifyPatch("issues", form);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["issues"] });
        },
    });

    const toggleDropdown = () => setOpen(!isOpen);

    const handleClick = (value: string) => {
        const modifyStateForm: StatusModify = {
            issueIds: [...checkedItem],
            state: value,
        };
        mutate(modifyStateForm);
        setCheckItem([])
        setIsAllChecked(false)
    }
    return (
        <button
            className="w-[50%] m-auto relative text-right mr-8"
            onClick={toggleDropdown}
        >
            <div>
                상태 수정 <DownOutlined />
            </div>
            {isOpen && (
                <div className="absolute bg-gray-100 dark:bg-darkModeBorderBG border border-gray-200 shadow-md z-10 mt-1 w-[200px] flex flex-col rounded-xl">
                    {filterType.map((curType, idx) => (
                        <div
                            key={idx}
                            className="flex-grow border-b-2 border-gray-200 px-6 flex items-center justify-between h-10"
                            onClick={() => handleClick(curType.value)}
                        >
                            <div>{curType.type}</div>
                            <MinusCircleOutlined />
                        </div>
                    ))}
                </div>
            )}
        </button>
    );
};

export default IssueStatusFilter;
