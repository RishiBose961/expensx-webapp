import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const TotalIncome = () => {
    const { user } = useSelector(
        (state: { auth: { isAuthenticated: boolean; isLoading: boolean; user: { token?: string } } }) =>
          state.auth
      );

   
      const {
        isPending,
        error,
        isError,
        data: totalsIncome,
      } = useQuery({
        queryKey: ["totalIncomes"],
        queryFn: async () => {
    
          return await fetch(`http://localhost:5000/api/rd/income`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }).then((res) => res.json());
        },
        staleTime: 10000,
        enabled: !!user?.token,
      });
    
      if (isError) {
        return <span>Error: {error.message}</span>;
      }
    
      return { isPending, totalsIncome };
}

export default TotalIncome