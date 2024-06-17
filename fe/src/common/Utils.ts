import { FormState } from "../components/LabelsMilestones/Milestones/MilestoneEditUI";
import { ChangeColorProps } from "../components/LabelsMilestones/Labels/LabelEditUI";
import { LabelFormState } from "../components/LabelsMilestones/Labels/LabelEditUI";
import { SignUpForm } from "../pages/SignUpPage";
import { LoginForm } from "../pages/LoginPage";
import { PostRequestFrom } from "../pages/NewPage";
import { notification } from "antd";
import { CommentCreateForm } from "../components/IssueDetail/CommentArea";
import { TitleForm } from "../components/IssueDetail/TitleUi";
import { SideBarUpdateForm } from "../pages/IssueDetailPage";
import { StatusModify } from "../components/IssueContainer/IssueStatusFilter";
const SNACK_BAR_DELAY = 2000
interface TitleState {
    title: string;
}

interface CommentModify {
    content: string
}

export type CreateDataType = FormState | LabelFormState | PostRequestFrom | SignUpForm | LoginForm | CommentCreateForm

const serverURL = import.meta.env.VITE_API_URL;
const token = sessionStorage.getItem('token')

export const APiUtil = {
    async getData(tableName: string) {
        try {
            const response = await fetch(serverURL + tableName, {
                
                headers: {
                    "content-type": "application/json",
                    "Authorization": token ? `Bearer ${token}` : "",
                }
            });
            if (!response.ok) {
                throw new Error(`에러!: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("getData 함수 오류:", error);
            throw error;
        }
    },

    async createData(tableName: string, createData: CreateDataType) {
        
        const response = await fetch(serverURL + tableName, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": token ? `Bearer ${token}` : "",
            },
            body: JSON.stringify(createData),
        });
        return response
    },

    async modifyData(tableName: string, modifyData: FormState | LabelFormState | TitleState, id: number | string | undefined) {
        await fetch(serverURL + `${tableName}/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "Authorization": token ? `Bearer ${token}` : "",
            },
            body: JSON.stringify(modifyData),
        });
    },

    async deleteData(tableName: string, id: number) {
        try {
            await fetch(serverURL + `${tableName}/${id}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "Authorization": token ? `Bearer ${token}` : "",
                },
            });
        } catch (error) {
            console.error(error);
        }
    },

    async patchData(tableName: string) {
        await fetch(serverURL + `${tableName}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "Authorization": token ? `Bearer ${token}` : "",
            },
        });
    },
    async ModifyPatch(tableName: string, form : CommentModify | TitleForm | SideBarUpdateForm | StatusModify) {
        await fetch(serverURL + `${tableName}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "Authorization": token ? `Bearer ${token}` : "",
            },
            body: JSON.stringify(form),
        });
    },
};

export const changeColor = ({ setColor, setFormData }: ChangeColorProps) => {
    const letters = "0123456789ABCDEF";
    let newColor = "#";
    for (let i = 0; i < 6; i++) {
        newColor += letters[Math.floor(Math.random() * 16)];
    }
    setColor(newColor);
    setFormData((prevState) => ({
        ...prevState,
        backgroundColor: newColor,
    }));
};

export const getDateDifference = (createdAt: string | undefined) => {
    const createdDate = new Date(createdAt as string + "-09:00");
    const nowDate = new Date();
    
    const betweenTime = Math.floor((nowDate.getTime() - (createdDate.getTime())) / 1000 / 60 );
    if (betweenTime < 1) return "방금 전";
    if (betweenTime < 60) return `${betweenTime}분 전`;

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) return `${betweenTimeHour}시간 전`;

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) return `${betweenTimeDay}일 전`;

    return `${Math.floor(betweenTimeDay / 365)}년 전`;
};

export const openNotification = (message: string) => {
    notification.info({
        message: message,
        placement: "top",
    });

    setTimeout(() => {
        notification.destroy();
    }, SNACK_BAR_DELAY);
};

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))