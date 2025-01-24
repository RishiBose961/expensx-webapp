import BottomNav from "@/components/Navbar/BottomNav";
import { Navbar } from "@/components/Navbar/Navbar";
import useAuthEffect from "@/components/useAuthEffect";
import UserInfo from "@/components/UserInfo";
import { Navigate, Outlet, createRootRoute } from "@tanstack/react-router";
export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  useAuthEffect();
  const { isAuthenticated, isLoading } = UserInfo();


  return (
    <>
      {isLoading ? (
        <div className=" text-white">Loading</div>
      ) : (
        <>
          {isAuthenticated ? (
            <>
              <Navbar />
              <BottomNav />
            </>
          ) : (
            <Navigate to="/security/login" replace />
          )}
        </>
      )}
      <Outlet />
    </>
  );
}
