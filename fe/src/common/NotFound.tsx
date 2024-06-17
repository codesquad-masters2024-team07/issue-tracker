import { Spin } from "antd";
const NotFound = () => {
    return (
        <div className="h-[90px] flex items-center justify-center">
            Not Found
        </div>
    );
};

export default NotFound;

export const Loading = () => (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-darkModeBG">
        <Spin tip="Loading..." size="large">
            <div className="p-8 bg-gray-200">
            </div>
        </Spin>
    </div>
);