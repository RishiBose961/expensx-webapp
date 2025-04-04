import CheckEnvironment from "@/CheckEnvironment/CheckEnvironment";
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
import CategoryUserID from "@/hook/CategoryUserID";
import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

export function UpdateExpense() {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const { user } = useSelector(
    (state: {
      auth: {
        isAuthenticated: boolean;
        isLoading: boolean;
        user: { token?: string };
      };
    }) => state.auth
  );

  const { base_url } = CheckEnvironment();

  const { isPending, CategoryUserid } = CategoryUserID() as {
    isPending: boolean;
    CategoryUserid: { categorid: string };
  };

  const createUpdateMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.put(
        `${base_url}/api/up/category-expense`,
        {
          id: CategoryUserid?.categorid,
          categorybased: tags,
        },
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
      setTags([]);
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

    if (tags.length === 0) {
      setError("Please add at least one category.");
      return;
    }

    createUpdateMutation.mutate();
  };

  const handleAddTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {isPending ? (
          <p>loading</p>
        ) : (
          <p className="cursor-pointer underline text-white">Update</p>
        )}
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
                placeholder="Type and press Enter..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button type="button" onClick={handleAddTag}>
                Add
              </Button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center bg-blue-500 text-white px-2 py-1 rounded"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(index)}
                    className="ml-2 text-sm font-bold"
                    aria-label={`Remove ${tag}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" disabled={createUpdateMutation.isPending}>
              {createUpdateMutation.isPending ? "Saving..." : "Save changes"}
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
