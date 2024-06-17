import React, { createContext, useReducer } from "react";
import { ReactNode } from "react";

export type FilterState = {
    req_query: string;
};

export interface Action {
    type: string;
    selectFilter?: string;
}

export type Dispatch = (action: Action) => void;

const initialState: FilterState = { req_query: "issues?=state:OPEN" };

export const FilterContext = createContext<[FilterState, Dispatch]>([initialState, () => {}]);

function FilterReducer(state: FilterState, { type, selectFilter }: Action): FilterState {
    switch (type) {

        case "ADD_TASK_FILTER":
            return { ...state, req_query: state.req_query +  " " + selectFilter};

        case "REMOVE_TASK_FILTER":
            return { ...state, req_query: state.req_query.replace(selectFilter || "", "").trim() };

        case "SET_INIT":
            return { req_query: "is_open=true" };

        case "SEARCH":
            return { ...state, req_query: selectFilter || ""};

        default:
            throw new Error();
    }
}

const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [FilterState, FilterDispatch] = useReducer(FilterReducer, initialState);
    
    return (
        <FilterContext.Provider value={[ FilterState, FilterDispatch ]}>
            {children}
        </FilterContext.Provider>
    )
};

export default FilterProvider;
