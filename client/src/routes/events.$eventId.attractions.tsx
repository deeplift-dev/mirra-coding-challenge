import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/events/$eventId/attractions')({
  component: () => <div>Hello /events/$eventId/attractions!</div>
})