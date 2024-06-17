import { Header } from "../common/UtilUI";
import MilestoneEditUI from "../components/LabelsMilestones/Milestones/MilestoneEditUI";
import Nav from "../components/LabelsMilestones/Nav";
import ModifyDeleteProvider from "../Providers/ModifyDeleteProvider";
import { APiUtil } from "../common/Utils";
import { MilestoneFeed } from "../components/LabelsMilestones/Milestones/MilestoneFeed";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../common/NotFound";

const MilestonesPage = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["milestones"],
        queryFn: () => APiUtil.getData("milestones"),
    });

    if (isLoading) return <Loading/>;
    return (
        <main className="w-[1280px] mx-auto">
            <Header />
            <ModifyDeleteProvider>
                <Nav location="milestone" labelsCount={data.labelCount} milestoneCount={data.openMilestoneCount}/>
                <MilestoneEditUI />
                <MilestoneFeed milestoneData={data.milestones} />
            </ModifyDeleteProvider>
        </main>
    );
};

export default MilestonesPage;
