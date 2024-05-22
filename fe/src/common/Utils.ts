import { FormState } from "../components/LabelsMilestones/Milestones/MilestoneEditUI";
import { ChangeColorProps } from "../components/LabelsMilestones/Labels/LabelEditUI";

const serverURL = import.meta.env.VITE_API_URL;

export const APiUtil = {
    async getData(tableName: string) {
        const response = await fetch(serverURL + tableName);
        const data = await response.json();
        return data;
    },

    async createData(tableName: string, createData: FormState) {
        await fetch(serverURL + tableName, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(createData),
        });
    },

    async modifyData(tableName: string, createData: FormState, id: number) {
        await fetch(serverURL + `${tableName}/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(createData),
        });
    },

    async deleteData(tableName: string, id: number) {
        try {
            await fetch(serverURL + `${tableName}/${id}`, {
                method: "DELETE",
            });
        } catch (error) {
            console.error(error);
        }
    },

    async patchData(tableName: string, id: number) {
        await fetch(serverURL + `${tableName}/${id}/close`, {
            method: "PATCH",
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
        color: newColor,
    }));
};

export const getDateDifference = (createdAt: string) => {
    const createdDate = new Date(createdAt);
    const nowDate = new Date();

    const betweenTime = Math.floor((nowDate.getTime() - createdDate.getTime()) / 1000 / 60);
    if (betweenTime < 1) return "방금 전";
    if (betweenTime < 60) return `${betweenTime}분 전`;

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) return `${betweenTimeHour}시간 전`;

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) return `${betweenTimeDay}일 전`;

    return `${Math.floor(betweenTimeDay / 365)}년 전`;
};

