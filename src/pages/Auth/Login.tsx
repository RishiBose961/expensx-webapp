import CheckEnvironment from "@/CheckEnvironment/CheckEnvironment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loadUser, loginUserAction } from "@/slice/authSlice";
import { AppDispatch } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { Link, Navigate } from "@tanstack/react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { base_url } = CheckEnvironment();

  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated, isLoading } = useSelector(
    (state: { auth: { isAuthenticated: boolean; isLoading: boolean } }) =>
      state.auth
  );

  const loginMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const response = await axios.post(`${base_url}/api/login`, {
        email,
        password,
      });
      dispatch(loginUserAction(response.data));
      return response.data; // Return response data
    },
    onSuccess: () => {
      alert("Login successful!");
    },
    onError: (error: { response: { data: string } }) => {
      console.error(error?.response.data);
      setError(error?.response.data);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    loginMutation.mutate({ email, password });
  };

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return isAuthenticated ? (
      <Navigate to={`/`} replace />
    ) : (
      <Navigate to="/" replace />
    );
  }

  return (
    <div className="flex items-center justify-center bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-sm dark:text-gray-300">
            Please sign in to your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
          <div className="rounded-md shadow-sm space-y-3  ">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300
                 placeholder-gray-500 text-gray-900 dark:text-white  rounded-t-md focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:text-white 
                 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <p>{error}</p>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </Button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm dark:text-gray-300">
            Don't have an account?{" "}
            <Link
              to="/security/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
