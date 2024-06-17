import { useQuery } from "@tanstack/react-query";
import { APiUtil } from '../common/Utils';
const useQueryHook = (issueId: string | undefined, query: string) => {
    const { data, isLoading } = useQuery({
        queryKey: ["issueDetail", issueId],
        queryFn: () => APiUtil.getData(query),
    });

    return { data, isLoading };
};

export default useQueryHook
