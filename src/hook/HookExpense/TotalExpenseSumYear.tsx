import CheckEnvironment from "@/CheckEnvironment/CheckEnvironment";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const TotalExpenseSumYear = () => {
    const { user } = useSelector(
        (state: {
          auth: {
            isAuthenticated: boolean;
            isLoading: boolean;
            user: { token?: string };
          };
        }) => state.auth
      );

      const { base_url } = CheckEnvironment();
      
    
      const date = new Date();
    
      const year = date.getFullYear();

    
      const {
        isPending,
        error,
        isError,
        data: fetchExpenseSumYear,
      } = useQuery({
        queryKey: ["fetchExpenseSumYears"],
        queryFn: async () => {
          return await fetch(
            `${base_url}/api/calculate-total-year-expenses?year=${year}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
            }
          ).then((res) => res.json());
        },
        staleTime: 7000,
        enabled: !!user?.token,
      });
    
      if (isError) {
        return <span>Error: {error.message}</span>;
      }
    
      return { isPending, fetchExpenseSumYear };
}

export default TotalExpenseSumYear