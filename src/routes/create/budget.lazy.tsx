import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/create/budget')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/create/budget"!</div>
}
