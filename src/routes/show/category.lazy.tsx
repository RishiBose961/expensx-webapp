import ShowCategory from '@/pages/Expense/ShowCategory'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/show/category')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className=" mx-auto max-w-6xl">
    <ShowCategory/>
  </div>
}
