import CreateExpense from "@/pages/Expense/CreateExpense";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/create/expense")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className=" mx-auto max-w-6xl">
     <CreateExpense /> 
    </div>
  );
}
