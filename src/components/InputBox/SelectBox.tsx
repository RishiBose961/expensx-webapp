import ExpenseCategory from "@/hook/ExpenseCategory";

interface AboutInfo {
  title: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}
const SelectBox = ({ title,value,onChange }: AboutInfo) => {
  const { isPending, fetchCategory } = ExpenseCategory() as {
    isPending: boolean;
    fetchCategory: Array<{ categorybased: string }>;
  };

  return (
    <div className=" space-y-3 pt-3 mt-3 mx-3">
      <div>
        <label
          htmlFor="HeadlineAct"
          className="block text-sm font-medium text-gray-900 dark:text-gray-200"
        >
          {title}
        </label>
        {isPending ? (
          " Loading..."
        ) : (
          <select
            name="HeadlineAct"
            id="HeadlineAct"
            value={value}
            onChange={onChange}
            className="mt-1.5 w-full p-4 rounded-lg border-gray-300 bg-white text-gray-700 sm:text-sm
                  dark:bg-black ring-1 ring-gray-200 dark:ring-white  capitalize dark:text-gray-200"
          >
              <option value="" selected disabled hidden>Choose here</option>
            {fetchCategory?.map((category, index) => (
              <option key={index} value={category?.categorybased} className=" capitalize">{category?.categorybased}</option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default SelectBox;
