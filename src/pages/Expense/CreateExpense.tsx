import InputBox from "@/components/InputBox/InputBox";
import SelectBox from "@/components/InputBox/SelectBox";

const CreateExpense = () => {
  return (
    <div>
      <p className="mt-4 font-bold text-xl mx-2">Expense</p>
      <InputBox title={"Amount"} type={"number"} value="undefined" />
      <SelectBox title={"Category"} />
      <InputBox title={"Pick A Date"} type={"date"} />
      <InputBox title={"Month"} type={"month"} />
    </div>
  );
};

export default CreateExpense;
