import Register from '@/pages/Auth/Register'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/security/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className=" mx-auto max-w-6xl">
    <Register/>
  </div>
}
