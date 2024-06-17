import React, { useContext, useEffect, useState } from "react";
import { Milestone } from "./MilestoneFeed";
import { ModifyDeleteContext } from "../../../Providers/ModifyDeleteProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APiUtil } from "../../../common/Utils";
interface MilestoneEditUIProps {
    curMilestone?: Milestone;
}
export interface FormState {
    title: string;
    dueDate: string;
    description: string;
}

interface MutationPayload {
    formData: FormState;
    type: "createData" | "modifyData";
    id?: number;
}

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const MilestoneEditUI = ({ curMilestone }: MilestoneEditUIProps) => {
    const queryClient = useQueryClient();
    const [isActive, setActive] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(true)
    const [ModifyDeleteState, ModifyDeleteDispatch] = useContext(ModifyDeleteContext);
    
    const handleFocus = () => setActive(true);
    const handleBlur = () => setActive(false);
    const { mutate } = useMutation({
        mutationFn: async ({ formData, type, id }: MutationPayload) => {
            if (type === "createData") {
                await APiUtil.createData("milestones/new", formData);
            } else if (type === "modifyData" && id !== undefined) {
                await APiUtil.modifyData("milestones", formData, id);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["milestones"]});
        },
    });

    const [formData, setFormData]: [
        FormState,
        React.Dispatch<React.SetStateAction<FormState>>
    ] = useState({
        title: "",
        description: "",
        dueDate: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (formData.title !== "" && formData.description !== "" && dateRegex.test(formData.dueDate)) {
            return setButtonDisable(false);
        } else {
            return setButtonDisable(true);
        }
            
    }, [formData]);

    useEffect(() => {
        if (ModifyDeleteState.state === "modify" && setFormData) {
            setFormData((prevState) => ({
                ...prevState,
                title: curMilestone?.title ?? "",
                dueDate: curMilestone?.dueDate ?? "",
                description: curMilestone?.description ?? "",
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                title: "",
                dueDate: "",
                description: "",
            }));
        }
    }, [ModifyDeleteState.state, curMilestone]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>, id?: number) => {
        const type = ModifyDeleteState.state === "create" ? "createData" : "modifyData"
        e.preventDefault();
        console.log(formData)
        mutate({formData, type, id});
        ModifyDeleteDispatch({ type: "SET_INIT", Payload: ""})
    };

    return (
        <div
            className={`${
                ModifyDeleteState.state === "create" ||
                ModifyDeleteState.id === curMilestone?.id
                    ? "my-4"
                    : "hidden"
            } w-full h-72 border-2 border-gray-300  rounded-xl bg-white dark:bg-darkModeBorderBG`}
        >
            <div className="p-6 gap-2 flex flex-col h-full">
                <h3 className="font-medium text-xl mb-4">
                    {ModifyDeleteState.state === "modify"
                        ? "마일스톤 편집"
                        : "새로운 마일스톤 추가"}
                </h3>
                <form
                    onSubmit={(e) => handleSubmit(e, curMilestone?.id)}
                    className="flex flex-col gap-4"
                >
                    <div className="flex flex-col gap-6">
                        <div className="flex justify-between">
                            <input
                                type="text"
                                name="title"
                                className="w-full h-[40px] px-3 py-2 text-gray-500 border rounded-xl bg-gray-100"
                                placeholder="마일스톤 이름을 입력하세요."
                                value={formData.title}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="dueDate"
                                className="w-full px-3 h-[40px] py-2 ml-4 text-gray-500 border rounded-xl bg-gray-100"
                                placeholder="완료일(선택) YYYY-MM-DD"
                                onFocus={() => handleFocus()}
                                onBlur={() => handleBlur()}
                                value={formData.dueDate}
                                onChange={handleChange}
                            />
                        </div>
                        <input
                            type="text"
                            name="description"
                            className="w-full h-[40px] px-3 py-2 text-gray-500 border rounded-xl bg-gray-100"
                            placeholder="마일스톤에 대한 설명을 입력하세요."
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    {isActive && !dateRegex.test(formData.dueDate) && (
                        <div className="reality">
                            <div className="absolute text-red-500">완료일 형식을 맞춰주세요.</div>
                        </div>
                    )}
                    <div className="flex flex-row-reverse gap-2 mt-2">
                        <button
                            type="submit"
                            disabled={buttonDisable}
                            className={`${buttonDisable && "bg-gray-200"} flex justify-center items-center border-none bg-blue-500 px-6 rounded-xl text-white text-sm h-10 w-32`}
                        >
                            + 완료
                        </button>
                        <button
                            onClick={() =>
                                ModifyDeleteDispatch({
                                    type: "SET_INIT",
                                    Payload: "",
                                })
                            }
                            className="flex justify-center text-center items-center border-2 border-blue-500 px-6 rounded-xl text-blue-500 text-sm h-10 w-32"
                        >
                            X 취소
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MilestoneEditUI;
