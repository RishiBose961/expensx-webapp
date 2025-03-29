import { ChartPage } from "@/components/Charts/ChartPage";
import { IncomeChart } from "@/components/Charts/IncomeChart";
import { FirstLogin } from "@/components/Popup/FirstLogin";
import TotalExpense from "@/hook/HookExpense/TotalExpense";
import FirstUserIncome from "@/hook/HookIncome/FirstUserIncome";
import TotalIncome from "@/hook/HookIncome/TotalIncome";
import { Edit2, ReceiptText, Search } from "lucide-react";
import { CreateCategory } from "../Expense/CreateCategory";
import LoadingCircle from "@/components/Loading/LoadingCircle";

const HomePage = () => {
  const { isPending, fetchtotalExpense } = TotalExpense() as {
    isPending: boolean;
    fetchtotalExpense: { totalExpense: number };
  };

  const { isPending: loading, totalsIncome } = TotalIncome() as {
    isPending: boolean;
    totalsIncome: { totalIncome: string };
  };
  const { isPending: load, firstLoginUser } = FirstUserIncome() as {
    isPending: boolean;
    firstLoginUser: { firstLogin: boolean };
  };

  return (
    <div className=" grid grid-cols-1 lg:grid-cols-3 mt-3 gap-3 mx-2">
      <div>
        <div className=" grid grid-cols-3 gap-2">
          <CreateCategory />

          <div className="bg-indigo-600 px-4 py-3 flex justify-evenly text-white mb-3 mt-2 rounded-full">
            <ReceiptText />
          </div>
          {load ? (
            <LoadingCircle/>
          ) : firstLoginUser?.firstLogin ? (
            <div className="bg-indigo-600 px-4 py-3 flex justify-evenly text-white mb-3 mt-2 rounded-full">
              <Search />
            </div>
          ) : (
            <FirstLogin firstLogin={firstLoginUser?.firstLogin} />
          )}
        </div>

        <div className=" flex justify-between border rounded-xl p-3 mb-4 space-y-2">
          <div className="">
            <p className="text-sm font-bold ">Analytics</p>
            <p className="text-md ">
              Income :{" "}
              <span className="font-bold">
                {loading
                  ? "loading"
                  : isNaN(Number(totalsIncome?.totalIncome)) ||
                      !totalsIncome?.totalIncome
                    ? 0
                    : parseInt(totalsIncome.totalIncome).toLocaleString()}
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
