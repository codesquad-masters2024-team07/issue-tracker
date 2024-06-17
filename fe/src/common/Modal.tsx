import { Modal } from "antd";
import { useState } from "react";


interface ModalComponentProps {
    type: string;
    callBack: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ModalComponent = ({type, callBack}: ModalComponentProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsModalOpen(false);
        callBack(e)
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const message = type === "닫기" ? "정말 닫으시겠습니까?" : type === "열기" ? "정말 여시겠습니까?" : "정말 삭제하시겠습니까?"
    return (
        <>
            <button className="" onClick={showModal}>
                {type}
            </button>
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {message}
            </Modal>
        </>
    );
};


