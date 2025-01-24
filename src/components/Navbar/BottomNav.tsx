import { Link } from "@tanstack/react-router";
import { CirclePlus, Home, Search, User } from "lucide-react";
const BottomNav = () => {
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
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5
               hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <Search />
          </button>

          <Link
            to="/security/login"
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 rounded-e-full
             hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <User />
          </Link>
        </div>
      </div>
    </>
  );
};

export default BottomNav;
