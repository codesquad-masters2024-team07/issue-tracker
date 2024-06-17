import { useState } from "react";
interface PasswordInputProps {
    password: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    validate: (type: string, min: number, max: number) => boolean;
}
const PasswordInput = ({password, handleChange, validate}: PasswordInputProps) => {
    const [isFocus, setIsFocus] = useState(false);

    const handleFocus = () => setIsFocus(true);
    const handleBlur = () => setIsFocus(false);
    return (
        <>
            <input
                name="password"
                className={`focus:outline-none bg-slate-200 text-black px-8 py-2 border-solid border-2 rounded-xl `}
                type="password"
                value={password}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                minLength={6}
                maxLength={12}
                placeholder="비밀번호(6 - 12자리)"
                pattern=".{6,12}"
                title="비밀번호는 6자 이상 12자 이하여야 합니다."
            />
            {isFocus && !validate(password, 6, 12) && (
                <p className="text-red-500 text-sm">
                    비밀번호는 6자 이상 12자 이하여야 합니다.
                </p>
            )}
        </>
    );
};

export default PasswordInput;
