import React, { useContext, useEffect, useRef, useState } from "react";
import { DownOutlined, DownCircleOutlined } from "@ant-design/icons";
import { FilterContext } from "../../Providers/FilterProvider";
import CircleIcon from "../../assets/free-icon-circle-3962612.png"
export interface Filter {
    value: string;
    query: string;
}

interface FilterProps {
    filterInfo: Filter[];
    filterType: string;
    resetFilterUI: boolean;
    setResetFilterUI: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterUI: React.FC<FilterProps> = ({
    filterInfo,
    filterType,
    resetFilterUI,
    setResetFilterUI,
}) => {
    const [, FilterDispatch] = useContext(FilterContext);
    const [isOpen, setIsOpen] = useState(false);
    const [selectItem, setSelectItem] = useState<Filter[]>([]);
    const dropdownRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (resetFilterUI) setSelectItem([]);
        setResetFilterUI(false);
        FilterDispatch({ type: "SET_INIT", selectFilter: ""});
    }, [resetFilterUI, filterInfo, FilterDispatch, setResetFilterUI]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClick = async(type: Filter) => {
        if (selectItem) {
            FilterDispatch({ type: "REMOVE_TASK_FILTER", selectFilter: type.query });
            setSelectItem((prev) => prev.filter((item) => item.value !== type.value));
        } else {
            FilterDispatch({ type: "ADD_TASK_FILTER", selectFilter: type.query});
            setSelectItem((prev) => [...prev, type]);
        }
    };

    return (
        <button
            onClick={toggleDropdown}
            className="relative text-sm font-normal h-full w-full"
            ref={dropdownRef}
        >
            <div className="flex justify-evenly h-full items-center">
                <div>{filterType}</div>
                <DownOutlined />
            </div>
            {isOpen && (
                <div className="absolute bg-gray-100 dark:bg-darkModeBorderBG border border-gray-200 shadow-md z-10 mt-1 w-[230px] flex flex-col rounded-xl">
                    {filterInfo.map((type, idx) => (
                        <div
                            onClick={() => handleClick(type)}
                            className="flex-grow border-b-2 border-gray-200 px-6 flex items-center justify-between h-10"
                            key={idx}
                        >
                            <div className={`${selectItem.find((curItem) => curItem.value === type.value) && "font-bold"}`}>
                                {type.value}
                            </div>
                            {selectItem.find((curItem) => curItem.value === type.value) ? (
                                <DownCircleOutlined />
                            ) : (
                                <img src={CircleIcon} alt="Circle Icon" className="w-[14px] h-[14px]"/>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </button>
    );
};

export default FilterUI;
