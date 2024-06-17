import { Header } from "../common/UtilUI";
import ModifyDeleteProvider from "../Providers/ModifyDeleteProvider";
import Nav from "../components/LabelsMilestones/Nav";
import { LabelFeed } from "../components/LabelsMilestones/Labels/LabelFeed";
import LabelEditUI from "../components/LabelsMilestones/Labels/LabelEditUI";
import { useQuery } from "@tanstack/react-query";
import { APiUtil } from "../common/Utils";
import { Loading } from "../common/NotFound";

const LabelsPage = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["labels"],
        queryFn: () => APiUtil.getData("labels"),
    });
    if (isLoading) return <div><Loading/></div>;
    return (
        <main className="w-[1280px] mx-auto">
            <Header />
            <ModifyDeleteProvider>
                <Nav location="labels" labelsCount={data.labelCount} milestoneCount={data.openMilestoneCount}/>
                <LabelEditUI />
                <LabelFeed labelsInfo={data.labelResponses} labelsCount={data.labelCount}/>
            </ModifyDeleteProvider>
        </main>
    );
};

export default LabelsPage;