import { ChartPage } from "@/components/Charts/ChartPage";
import { IncomeChart } from "@/components/Charts/IncomeChart";
import { CreateCategory } from "../Expense/CreateCategory";

const HomePage = () => {
  
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-3 mt-3 gap-3 mx-2">
      <div>
        <div className="bg-indigo-600 px-4 py-3 text-white mb-3 mt-2 rounded-xl">
          <p className="text-center text-sm font-medium ">
            Create Expense Category
            <div  className="inline-block mx-2 underline">
              <CreateCategory/>
            </div>
          </p>
        </div>
        <div className=" border rounded-xl p-3 mb-4 space-y-2">
          <p className="text-md ">Income</p>
          <p className="text-md ">Budget</p>
          <p className="text-md ">Expense</p>
        </div>

        <IncomeChart />
      </div>
      <div className=" lg:col-span-2">
        <ChartPage />
      </div>
    </div>
  );
};

export default HomePage;
