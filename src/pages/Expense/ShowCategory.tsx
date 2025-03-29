import ExpenseCategory from "@/hook/ExpenseCategory";

const ShowCategory = () => {
  const { isPending, fetchCategory } = ExpenseCategory() as {
    isPending: boolean;
    fetchCategory: Array<{ categorybased: string }>;
  };
  return (
    <div>
      <h2>Category</h2>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 px-2 mt-4">
        {fetchCategory?.map((category, index) => (
          <div
            key={index}
            className="relative p-2 border-2 text-center  rounded-md group transition duration-300 ease-in-out"
          >
            {category.categorybased}
            <button
              className="absolute inset-0 bg-black dark:bg-white font-semibold  text-white dark:text-black 
             py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 transition duration-300"
            >
              UPDATE
            </button>
          </div>
        ))}
      </div>
      {isPending && <p>Loading...</p>}
    </div>
  );
};

export default ShowCategory;
