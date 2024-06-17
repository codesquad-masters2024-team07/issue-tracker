import { useEffect, useState } from "react";
import FileUploader from "../common/FileUploader";
import { UserImgBox } from "../common/UserImgBox";
import { Link, useNavigate } from "react-router-dom";
import { openNotification } from "../common/Utils";
import IdInput from "../components/SignUpInput/IdInput";
import PasswordInput from "../components/SignUpInput/PasswordInput";

const serverURL = import.meta.env.VITE_API_URL;
export interface SignUpForm {
    username: string;
    id: string;
    password: string;
    imgUrl: string;
}
const SignUp = () => {
    const navigate = useNavigate();
    const [isFormValid, setIsFormValid] = useState(false);
    const [isIdUnique, setIsIdUnique] = useState(false);

    const [signUpForm, setSignUpForm] = useState<SignUpForm>({
        id: "",
        username: "",
        password: "",
        imgUrl: "",
    });

    const addImgUrl = (url: string) => {
        setSignUpForm(prev => ({
            ...prev,
            imgUrl: url
        }))
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validate = (type: string, min: number, max: number) => {
        const regex = new RegExp(`^[a-zA-Z0-9]{${min},${max}}$`);
        return regex.test(type);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch(serverURL + "users", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(signUpForm),
        });
        if (response.status === 201) {
            openNotification("회원가입 성공");
            return navigate("/");
        }

        return openNotification(
            "로그인 실패! \n 아이디, 비밀번호를 다시 확인해주세요."
        );
    };

    const handleIsIdAvailable = async () => {
        const response = await fetch(
            serverURL + `users/checkUserId/${signUpForm.id}`
        );
        if(signUpForm.id === "") return openNotification("아이디를 입력해주세요.");
        if (response.status === 200) {
            setIsIdUnique(true);
            return openNotification("사용 가능!");
        }
        return openNotification("아이디가 중복되었습니다.");
    };
    
    const checkValue = () => {
        const { username } = signUpForm;
        return (
            username !== "" &&
            validate(signUpForm.id, 6, 16) &&
            validate(signUpForm.password, 6, 12)
        );
    };

    useEffect(() => {
        setIsFormValid(checkValue() && isIdUnique);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isIdUnique, signUpForm]);

    return (
        <main className="h-full flex justify-center items-center flex-col">
            <Link
                to="/"
                className="text-5xl font-style: italic font-extralight p-10"
            >
                Issue Tracker
            </Link>
            <UserImgBox imgURL={signUpForm.imgUrl} margin="auto" width="50px" height="50px"/>
            <FileUploader addImgUrl={addImgUrl}/>
            <div className="flex flex-col items-center">
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <input
                        name="username"
                        className="focus:outline-none bg-slate-200 text-black px-8 py-2 border-solid rounded-xl"
                        type="text"
                        value={signUpForm.username}
                        onChange={handleChange}
                        placeholder="이름"
                    />
                    <IdInput
                        id={signUpForm.id}
                        handleChange={handleChange}
                        handleIsIdAvailable={handleIsIdAvailable}
                        validate={validate}
                    />
                    <PasswordInput
                        password={signUpForm.password}
                        handleChange={handleChange}
                        validate={validate}
                    />
                    <input
                        className={`${
                            !isFormValid && "bg-gray-200"
                        } px-10 py-2 font-normal border-solid border-2 text-white rounded-xl bg-blue-500 cursor-pointer`}
                        type="submit"
                        disabled={!isFormValid}
                        value="회원가입"
                    />
                </form>
            </div>
        </main>
    );
};

export default SignUp;
