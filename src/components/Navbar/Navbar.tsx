import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";

export function Navbar() {


  return (
    <header className="bg-white dark:bg-black shadow-sm">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1 items-center">
          <svg
            className="h-8 w-auto text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <p className=" font-bold mx-2">Expensx</p>
        </div>

        <div className="lg:flex lg:flex-1 lg:justify-end">
          <UserMenu />
        </div>
      </nav>
    </header>
  );
}

function UserMenu({ mobile = false }: { mobile?: boolean }) {
  const { isAuthenticated,user } = useSelector(
    (state: { auth: { isAuthenticated: boolean; isLoading: boolean; user: {  username: string } } }) =>
      state.auth
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`${mobile ? "w-full justify-start" : ""}`}
        >
          Account
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {
          isAuthenticated? (
            <DropdownMenuItem>{user?.username}</DropdownMenuItem>
          ) : (
            <DropdownMenuItem>Sign in</DropdownMenuItem>
          )
        }
       
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Sign out</DropdownMenuItem>
        <DropdownMenuItem>
          Mood <ModeToggle/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
