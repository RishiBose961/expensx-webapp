interface MonthYearUsed {
  months?: string;
}

const MonthYear = ({ months }:MonthYearUsed) => {
  const currentDate = new Date();
  
  let selectedYear: string;
  let selectedMonth: string;

  if (typeof months === "string" && months.includes("-")) {
    [selectedYear, selectedMonth] = months.split("-");
  } else {
    selectedYear = String(currentDate.getFullYear());
    selectedMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
  }

  return { selectedYear, selectedMonth };
};

export default MonthYear;
