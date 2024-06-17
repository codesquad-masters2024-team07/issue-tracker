import { useState } from "react";
interface IdInputProps {
    id: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleIsIdAvailable: () => void;
    validate: (type: string, min: number, max: number) => boolean;
}
const IdInput = ({ id, handleChange, handleIsIdAvailable, validate }: IdInputProps) => {
    const [isFocus, setIsFocus] = useState(false);

    const handleFocus = () => setIsFocus(true);
    const handleBlur = () => setIsFocus(false);
    return (
        <>
        <div className="bg-slate-200 text-black px-8 py-2 border-solid rounded-xl flex">
            <input
                name="id"
                className="bg-slate-200 text-black focus:outline-none"
                type="text"
                value={id}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                minLength={6}
                maxLength={16}
                placeholder="아이디(6 - 16자리)"
            />
            <button
                type="button"
                onClick={handleIsIdAvailable}
                className="m-auto text-sm bg-blue-500 rounded-xl text-white py-1 px-2"
            >
                중복 확인
            </button>
        </div>
        {isFocus && !validate(id, 6, 16) && (
            <p className="text-red-500 text-sm">
                아이디는 6자 이상 16자 이하여야 합니다.
            </p>
        )}
        </>
    );
};

export default IdInput;
