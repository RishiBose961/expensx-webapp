import StatisticalHome from '@/pages/StatisticalPage/StatisticalHome'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(analysis)/statistical')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className=" mx-auto max-w-6xl">
    <StatisticalHome/>
  </div>
}
