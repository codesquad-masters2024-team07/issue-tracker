import React, { useEffect, useState } from "react";

interface ProgressbarProps {
    open: number;
    closed: number
}

const Progressbar = ({open, closed}: ProgressbarProps) => {
    const [ratio, setRatio] = useState<undefined|number>()
    useEffect(() => {
        const total = open + closed;
        setRatio(total === 0 ? 0 : (closed / total) * 100);
    }, [open, closed])
    return (
        <div>
            <div className="h-2 w-full bg-gray-200 rounded-md overflow-hidden">
                <div className={`h-full bg-blue-500 w-[${ratio}%]`}></div>
            </div>
            <div className="text-left mb-[-20px]">{ratio}%</div>
        </div>
    );
};

export default Progressbar;
