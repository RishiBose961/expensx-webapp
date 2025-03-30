import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import MonthYear from "./MonthYear";
import CheckEnvironment from "@/CheckEnvironment/CheckEnvironment";

interface MonthYearUsed {
  months?: string;
}

const GraphTotalIncome = ({ months }:MonthYearUsed) => {
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


  
  const { selectedYear, selectedMonth } = MonthYear({months});
  

  const {
    isPending,
    error,
    isError,
    data: totalsgraphresult,
  } = useQuery({
    queryKey: ["totalsgraphresults", selectedYear, selectedMonth],
    queryFn: async () => {
      return await fetch(
        `${base_url}/api/rd/income-total-balance?month=${selectedYear}-${selectedMonth}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      ).then((res) => res.json());
    },
    enabled: !!user?.token,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return { isPending, totalsgraphresult };
};

export default GraphTotalIncome;
