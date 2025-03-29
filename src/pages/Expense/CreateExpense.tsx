import InputBox from "@/components/InputBox/InputBox";
import SelectBox from "@/components/InputBox/SelectBox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const CreateExpense = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");

  const [error, setError] = useState("");

  const { toast } = useToast();

  const user = useSelector(
    (state: { auth: { user: { token: string } } }) => state.auth.user
  );

  const createExpense = useMutation({
    mutationFn: async ({
      amount,
      category,
      date,
      month,
    }: {
      amount: number;
      category: string;
      date: string;
      month: string;
    }) => {
      const response = await axios.post(
        `http://localhost:5000/api/cr/create-expense`,
        {
          amount,
          category,
          date,
          month,
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
        description: "You have successfully created an expense",
        duration: 3000,
      });
      setAmount("");
      setCategory("");
      setDate("");
      setMonth("");
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
    if (!amount || !category || !date || !month) {
      return setError("Please fill in all fields");
    }

    createExpense.mutate({ amount: Number(amount), category, date, month });
  };

  return (
    <div>
      <p className="mt-4 font-bold text-xl mx-2">Expense</p>
      <form onSubmit={handleSubmit}>
        <InputBox
          title={"Amount"}
          type={"number"}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <SelectBox
          title={"Category"}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <InputBox
          title={"Pick A Date"}
          type={"date"}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <InputBox
          title={"Month"}
          type={"month"}
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" className="mt-4 mx-2">
          Add Expense
        </Button>
      </form>
    </div>
  );
};

export default CreateExpense;
