import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TotalExpenseSumYear from "@/hook/HookExpense/TotalExpenseSumYear";
import TotalExpenseTable from "@/hook/HookExpense/TotalExpenseTable";


const Calctable = () => {
  const { isPending, fetchtotalExpenseTable } = TotalExpenseTable() as {
    isPending: boolean;
    fetchtotalExpenseTable: { amount: string; category: string;date:string}[];
  };

  const {isPending:isloading, fetchExpenseSumYear} = TotalExpenseSumYear() as {
    isPending: boolean;
    fetchExpenseSumYear: { totalExpense: string };
  }

  if (isPending) {
    return <div>Loading...</div>;
  }


  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Y/M/D</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fetchtotalExpenseTable?.map((invoice: { category: string; amount: string;date:string}) => (
          <TableRow>
            <TableCell className="font-medium capitalize">{invoice.category}</TableCell>
            <TableCell>{invoice.amount?.toLocaleString() ?? 0}</TableCell>
            <TableCell>{invoice.date}</TableCell>
     
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>{isloading?"Adding...":fetchExpenseSumYear?.totalExpense}</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
export default Calctable;
