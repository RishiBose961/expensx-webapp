import CheckEnvironment from "@/CheckEnvironment/CheckEnvironment";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const CategoryUserID = () => {
    const { user } = useSelector(
        (state: { auth: { isAuthenticated: boolean; isLoading: boolean; user: { token?: string } } }) =>
          state.auth
      );

      const { base_url } = CheckEnvironment();
    
      const {
        isPending,
        error,
        isError,
        data: CategoryUserid,
      } = useQuery({
        queryKey: ["CategoryUserIDs"],
        queryFn: async () => {
    
          return await fetch(`${base_url}/api/sh/getid-having`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }).then((res) => res.json());
        },
        staleTime: 7000,
        enabled: !!user?.token,
      });
    
      if (isError) {
        return <span>Error: {error.message}</span>;
      }
    
      return { isPending, CategoryUserid };
    };

export default CategoryUserID