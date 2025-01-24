import { loadUser } from "@/slice/authSlice";
import { AppDispatch } from "@/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useAuthEffect = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
};

export default useAuthEffect;
