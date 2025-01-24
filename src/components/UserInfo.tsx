import { useSelector } from "react-redux";

const UserInfo = () => {
  const { isAuthenticated, isLoading, } = useSelector(
    (state: { auth: { isAuthenticated: boolean; isLoading: boolean } }) =>
      state.auth
  );

  

  return { isAuthenticated, isLoading, };
};

export default UserInfo;
