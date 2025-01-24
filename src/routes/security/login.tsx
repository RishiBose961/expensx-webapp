import Login from '@/pages/Auth/Login'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/security/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className=" mx-auto max-w-6xl">
      <Login />
    </div>
  )
}
