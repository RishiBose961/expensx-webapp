import CheckEnvironment from "@/CheckEnvironment/CheckEnvironment";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const FirstUserIncome = () => {
    const { user } = useSelector(
        (state: { auth: { isAuthenticated: boolean; isLoading: boolean; user: { token?: string } } }) =>
          state.auth
      );

      const { base_url } = CheckEnvironment();

   
      const {
        isPending,
        error,
        isError,
        data: firstLoginUser,
      } = useQuery({
        queryKey: ["firstLoginUsers"],
        queryFn: async () => {
    
          return await fetch(`${base_url}/api/rd/income-logins`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }).then((res) => res.json());
        },
        enabled: !!user?.token,
      });
    
      if (isError) {
        return <span>Error: {error.message}</span>;
      }
    
      return { isPending, firstLoginUser };
}

export default FirstUserIncome