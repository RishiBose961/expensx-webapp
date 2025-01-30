import Calctable from '@/pages/Calctable/Calctable'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/calc/calc')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className=" mx-auto max-w-6xl">
    <Calctable/>
  </div>
}
