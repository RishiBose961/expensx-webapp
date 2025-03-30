import CheckEnvironment from "@/CheckEnvironment/CheckEnvironment";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const TotalExpense = () => {
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
  const month = String(date.getMonth() + 1).padStart(2, "0");

  const {
    isPending,
    error,
    isError,
    data: fetchtotalExpense,
  } = useQuery({
    queryKey: ["fetchtotalExpenses"],
    queryFn: async () => {
      return await fetch(
        `${base_url}/api/calculate-total-expenses?month=${year}-${month}`,
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

  return { isPending, fetchtotalExpense };
};

export default TotalExpense;
