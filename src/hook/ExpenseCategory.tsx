import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const ExpenseCategory = () => {
  const user = useSelector(
    (state: { auth: { user: { token: string } } }) => state.auth.user
  );


  const {
    isPending,
    error,
    isError,
    data: fetchCategory,
  } = useQuery({
    queryKey: ["fetchCategorys"],
    queryFn: async () => {
      return await fetch(`http://localhost:5000/api/sh/category-expense`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }).then((res) => res.json());
    },
    staleTime: 7000,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return { isPending, fetchCategory };
};

export default ExpenseCategory;
