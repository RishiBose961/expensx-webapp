import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { HandCoins } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

export function FirstLogin({ firstLogin }: { firstLogin: boolean }) {
  const [open, setOpen] = useState(true);
  const [amount, setAmount] = useState("");
  const queryClient = useQueryClient();

  const [error, setError] = useState("");

  const { toast } = useToast();

  const user = useSelector(
    (state: { auth: { user: { token: string } } }) => state.auth.user
  );

  const createIncome = useMutation({
    mutationFn: async ({ amount }: { amount: string }) => {
      const response = await axios.post(
        `http://localhost:5000/api/cr/income`,
        {
          incomeAmount: amount,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      return response.data; // Return response data
    },
    onSuccess: () => {
      toast({
        title: `${amount}`,
        description: "You have successfully created an Income",
        duration: 3000,
      });
      const invalidations = [
        queryClient.invalidateQueries({ queryKey: ["firstLoginUsers"] }),
        queryClient.invalidateQueries({ queryKey: ["totalIncomes"] }),
      ];

      Promise.all(invalidations);

      setOpen(false);
      setAmount("");
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
    if (!amount) {
      return setError("Please fill in all fields");
    }

    createIncome.mutate({ amount });
  };

  if (firstLogin) return null;

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="bg-indigo-600 px-4 py-3 flex justify-evenly text-white mb-3 mt-2 rounded-xl"
      >
        <HandCoins />
      </div>

      <Dialog open={open}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Income</DialogTitle>
            <DialogDescription className=" italic">
              Update your income to reflect the amount you earn in a year. This
              will help calculate your monthly budget and savings.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name">Income</label>
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="Enter Your Income"
                  className="col-span-3 font-bold text-xl ring-1 rounded-lg p-1 ps-3 ring-white bg-transparent"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <Button type="submit">Save</Button>
            </div>
          </form>

          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
