import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { APiUtil } from "../common/Utils";
import { openNotification } from "../common/Utils";
export interface LoginForm {
    id: string;
    password: string;
}

const LoginPage = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [LoginForm, setLoginForm] = useState<LoginForm>({
        id: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await APiUtil.createData("users/login", LoginForm);

        if (response.status !== 200) return openNotification("로그인 실패 \n 아이디, 비빌번호를 다시 확인 해주세요.");
        
        const data = await response.json();
        
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.userResponse));
        setIsLogin(true);
    };

    useEffect(() => {
        const isLogin = !!sessionStorage.getItem("token");
        if (isLogin) {
            navigate("/issue", { replace: true });
            location.reload();
        }
    }, [isLogin, navigate]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setLoginForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
    return (
        <main className="h-full flex justify-center items-center">
            <div className="flex flex-col items-center">
                <Link
                    to="/"
                    className="text-5xl font-style: italic font-extralight p-10"
                >
                    Issue Tracker
                </Link>
                <a className="px-10 py-2 font-normal border-solid border-2 text-blue-500 border-blue-500 rounded-xl">
                    Google 계정으로 로그인
                </a>
                <div className="p-4">or</div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <input
                        className="bg-slate-200 text-black px-8 py-2 border-solid rounded-xl"
                        name="id"
                        type="text"
                        onChange={handleChange}
                        value={LoginForm.id}
                        placeholder="아이디"
                    />
                    <input
                        className="bg-slate-200 text-black px-8 py-2 border-solid border-2 rounded-xl"
                        onChange={handleChange}
                        value={LoginForm.password}
                        name="password"
                        type="password"
                        placeholder="비밀번호"
                    />
                    <input
                        className="px-10 py-2 font-normal border-solid border-2 text-white border-blue-500 rounded-xl bg-blue-500 cursor-pointer"
                        type="submit"
                        value="아이디로 로그인"
                    />
                </form>
                <Link to="/SignUp" className="p-5">
                    회원가입
                </Link>
            </div>
        </main>
    );
};

export default LoginPage;
