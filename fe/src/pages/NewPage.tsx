import { useState } from "react";
import Sidebar from "../common/Sidebar";
import { Header } from "../common/UtilUI";
import { Link, useNavigate } from "react-router-dom";
import NewIssue from "../components/NewIssue/NewIssue";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APiUtil } from "../common/Utils";
import { UserImgBox } from "../common/UserImgBox";
import { UserInfo } from "./IssueDetailPage";

export interface SidebarMilestone {
    id: number;
    name: string
    title: string;
    openIssueCount: number;
    closedIssueCount: number;
}
export interface SidebarLabel {
    id: number;
    name: string;
    title?: string;
    description: string;
    textColor: string;
    backgroundColor: string;
}
export interface SidebarUser {
    title?: string;
    name?: string;
    id: string;
    imgUrl: string;
}
export interface Users {
    id: number;
    username: string;
    createdAt: string;
    imgUrl: string;
    role: string;
}
export interface PostRequestFrom {
    userId: string | undefined;
    title: string;
    content: string;
    assigneeIds: string[];
    labelIds: number[];
    milestoneId: number | null;
}
export interface NewIssueForm {
    userId: string | undefined;
    title: string;
    content: string;
}

export interface SideBarItemsForm {
    assignees: SidebarUser[];
    labels: SidebarLabel[];
    milestone: SidebarMilestone[];
}

export type TableType = {
    담당자: string;
    레이블: string;
    마일스톤: string;
};

const sideTable: {
    [key: string]: keyof SideBarItemsForm;
} = {
    담당자: "assignees",
    레이블: "labels",
    마일스톤: "milestone",
};



const userString = sessionStorage.getItem("user");
const userInfo: UserInfo | null = userString ? JSON.parse(userString) : null;

const NewPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [newIssueForm, setNewsIssueForm] = useState<NewIssueForm>({
        userId: userInfo?.id,
        title: "",
        content: "",
    });
    const [sideBarItems, setSideBarItems] = useState<SideBarItemsForm>({
        assignees: [],
        labels: [],
        milestone: [],
    });

    const handleListClick = (curData: SidebarLabel | SidebarMilestone | SidebarUser, tableName: string) => {
        setSideBarItems((prev) => {
            const key = sideTable[tableName];
            const currentSideItem = prev[key] as (SidebarLabel | SidebarMilestone | SidebarUser)[];

            if (currentSideItem.find((item) => item.id === curData.id)) {
                return {
                    ...prev,
                    [key]: currentSideItem.filter(
                        (item) => item.id !== curData.id
                    ),
                };
            }

            if(tableName === "마일스톤") {
                return {
                    ...prev,
                    [key]: [curData],
                };
            }

            return {
                ...prev,
                [key]: [...currentSideItem, curData],
            };
        });
    };
    const { mutate } = useMutation({
        mutationFn: async (newData: PostRequestFrom) => {
            await APiUtil.createData("issues", newData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["issues"] });
        },
    });


    const handleCreate = () => {
        const newData: PostRequestFrom = {
            ...newIssueForm,
            assigneeIds: sideBarItems.assignees
                ? sideBarItems.assignees.map((cur: SidebarUser) => cur.id)
                : [],
            labelIds: sideBarItems.labels
                ? sideBarItems.labels.map((cur: SidebarLabel) => cur.id)
                : [],
                milestoneId: !sideBarItems.milestone || sideBarItems.milestone.length === 0
                ? null
                : sideBarItems.milestone[0]?.id
        };
        mutate(newData);
        navigate("/issue");
    };

    return (
        <main className="w-[1280px] mx-auto">
            <Header />
            <h1 className="font-semibold h-[48px] text-3xl">
                새로운 이슈 작성
            </h1>
            <section className="flex gap-2 justify-between mt-4 py-6 border-t-2 border-b-2">
                <div className="items-center">
                    <UserImgBox
                        imgURL={userInfo?.imgUrl}
                        margin=""
                        width="50px"
                        height="50px"
                    />
                </div>
                <div className="w-[912px]">
                    <NewIssue
                        issueData={newIssueForm}
                        setIssueData={setNewsIssueForm}
                    />
                </div>
                <Sidebar
                    sideBarItems={sideBarItems}
                    handleListClick={handleListClick}
                    sideTable={sideTable}
                />
            </section>
            <div className="flex justify-end gap-6 mt-4 items-center">
                <Link to="/issue">X 작성 취소</Link>
                <button
                    onClick={handleCreate}
                    disabled={newIssueForm.title === ""}
                    className={`${
                        newIssueForm.title === "" && "bg-gray-200"
                    } flex justify-center items-center border-none bg-blue-500 px-6 rounded-xl text-white text-sm h-[46px] w-[200px]`}
                >
                    완료
                </button>
            </div>
        </main>
    );
};

export default NewPage;
