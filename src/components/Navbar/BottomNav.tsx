import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "@tanstack/react-router";
import { CirclePlus, Home, Sheet, User } from "lucide-react";
import { useSelector } from "react-redux";
const BottomNav = () => {
  const { user } = useSelector(
    (state: {
      auth: {
        isAuthenticated: boolean;
        isLoading: boolean;
        user: { avatar?: string; name?: string };
      };
    }) => state.auth
  );

  return (
    <>
      <div
        className="fixed z-50 w-full h-14 max-w-lg -translate-x-1/2 bg-white border
       border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600"
      >
        <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
          <Link
            to="/"
            className="inline-flex flex-col items-center justify-center px-5 rounded-s-full
               hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <Home />
          </Link>
          <Link
            to="/create/expense"
            className="inline-flex flex-col items-center justify-center px-5
               hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <CirclePlus />
          </Link>
          <Link
            to="/calc"
            className="inline-flex flex-col items-center justify-center px-5
               hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <Sheet />
          </Link>

        

          {user ? (
            <div className=" flex justify-center items-center">
              <Avatar>
                <AvatarImage
                  className=" size-8 rounded-full ring-2 ring-red-500 p-0.5"
                  src={user?.avatar}
                />
                <AvatarFallback>{user?.name?.slice(0, 1)}</AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <Link
              to="/security/login"
              type="button"
              className="inline-flex flex-col items-center justify-center px-5 rounded-e-full
   hover:bg-gray-50 dark:hover:bg-gray-800 group"
            >
              <User />
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default BottomNav;
