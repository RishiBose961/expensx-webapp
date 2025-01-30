import { ChartPage } from "@/components/Charts/ChartPage";
import { IncomeChart } from "@/components/Charts/IncomeChart";
import TotalExpense from "@/hook/HookExpense/TotalExpense";
import TotalIncome from "@/hook/HookIncome/TotalIncome";
import { Edit2 } from "lucide-react";
import { CreateCategory } from "../Expense/CreateCategory";

const HomePage = () => {
  

  const { isPending, fetchtotalExpense } = TotalExpense() as {
    isPending: boolean;
    fetchtotalExpense: { totalExpense: number };
  };

  const { isPending: loading, totalsIncome } = TotalIncome() as {
    isPending: boolean;
    totalsIncome: { totalIncome: string };
  };

 

  return (
    <div className=" grid grid-cols-1 lg:grid-cols-3 mt-3 gap-3 mx-2">
      <div>
        <div className="bg-indigo-600 px-4 py-3 text-white mb-3 mt-2 rounded-xl">
          <p className="text-center text-sm font-medium ">
            Create Expense Category
            <div className="inline-block mx-2 underline">
              <CreateCategory />
            </div>
          </p>
        </div>

        <div className=" flex justify-between border rounded-xl p-3 mb-4 space-y-2">
          <div className="">
            <p className="text-sm font-bold ">Analytics</p>
            <p className="text-md ">
              Income :{" "}
              <span className=" font-bold">
                {loading
                  ? "loading"
                  : (parseInt(totalsIncome?.totalIncome)?.toLocaleString() ??
                    0)}
              </span>
            </p>
            <p className="text-md ">
              Budget : <span className=" font-bold">?</span>
            </p>
            <p className="text-md ">
              Expense :{" "}
              <span className=" font-bold">
                {isPending
                  ? "loading"
                  : (fetchtotalExpense?.totalExpense?.toLocaleString() ?? 0)}
              </span>
            </p>
          </div>
          <div className="text-center">
            <Edit2 className=" size-4 cursor-pointer" />
          </div>
        </div>

        <IncomeChart />
      </div>
      <div className=" lg:col-span-2 mt-1">
        <ChartPage />
      </div>
    </div>
  );
};

export default HomePage;
