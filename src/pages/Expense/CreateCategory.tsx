import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

export function CreateCategory() {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const user = useSelector(
    (state: { auth: { user: { token: string } } }) => state.auth.user
  );

  const createPostMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `http://localhost:5000/api/cr/category-expense`,
        { categorybased: inputValue },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Category created successfully:", data);
      setInputValue("");
      setError("");
    },
    onError: (error: unknown) => {
      setError(
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "An error occurred"
      );
      console.error(error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    createPostMutation.mutate();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="cursor-pointer underline text-white">Add</p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Category of Expense</DialogTitle>
          <DialogDescription>
            Add a new category for your expenses
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="w-full p-2 border rounded capitalize text-black"
                placeholder="Type your category"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" disabled={createPostMutation.isPending}>
              {createPostMutation.isPending ? "Saving..." : "Save changes"}
            </Button>
            <Link to="/show/category" className="">
              <Button variant="link">View Category</Button>
            </Link>
          </div>
        </form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
