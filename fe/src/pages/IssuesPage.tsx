import Nav from "../components/IssueContainer/Nav";
import IssueFeed from "../components/IssueContainer/IssueFeed";
import { useState } from "react";
import FilterProvider from "../Providers/FilterProvider";
import { Header } from "../common/UtilUI";
import { APiUtil } from "../common/Utils";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../common/NotFound";

const IssuePage = () => {
    const [query, setQuery] = useState("issues?state=OPEN");
    const [isOpen, setOpen] = useState(true);
    const [resetFilterUI, setResetFilterUI] = useState(false);

    const handleResetFilterUI = () => setResetFilterUI(true);

    const { data, isLoading, error } = useQuery({
        queryKey: ["issues", query],
        queryFn: () => APiUtil.getData(query),
    });
    if (isLoading) return <div><Loading /></div>;
    if (error) return <div>{error.message}</div>;
    
    return (
        <FilterProvider>
            <main className="w-[1280px] mx-auto">
                <Header />
                <Nav
                    labelCount={data.labelCount}
                    openMilestoneCount={data.openMilestoneCount}
                    resetFilterUI={resetFilterUI}
                    setResetFilterUI={setResetFilterUI}
                    handleResetFilterUI={handleResetFilterUI}
                />
                <IssueFeed
                    setQuery={setQuery}
                    isOpen={isOpen}
                    setOpen={setOpen}
                    issueInfo={data}
                    resetFilterUI={resetFilterUI}
                    setResetFilterUI={setResetFilterUI}
                />
            </main>
        </FilterProvider>
    );
};

export default IssuePage;
