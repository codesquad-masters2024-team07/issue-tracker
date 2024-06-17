import { useState } from "react";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

const LogOut = () => {
    const handleLogOut = () => {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
        location.reload();
    }
    return (
        <button onClick={handleLogOut} className="mr-6">
            로그아웃
        </button>
    );
};

const ThemeSwitch = () => {
    const [isDarkMode, setDarkMode] = useState(false);
    const toggleTheme = () => {
        document.documentElement.classList.toggle("dark");
        setDarkMode((prev) => !prev);
    };

    return (
        <div className="flex justify-between">
            <button className="text-xl p-4" onClick={toggleTheme}>
                {isDarkMode ? <SunOutlined /> : <MoonOutlined />}
            </button>
            <LogOut />
        </div>
    );
};

export default ThemeSwitch;
