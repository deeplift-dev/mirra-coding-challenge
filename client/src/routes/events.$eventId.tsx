import { useQuery } from '@tanstack/react-query';
import {
  createFileRoute,
} from '@tanstack/react-router'
import { hc } from 'hono/client'
import { Attraction, Event as EventType } from '../../../shared/types/ticketmaster';

const client = hc('http://localhost:3000')

export const Route = createFileRoute('/events/$eventId')({
    component: Event,
  })


function Event() {
  const { eventId } = Route.useParams();
  const $getEvent = client.events[eventId].$get

  const fetchEvent = async (): Promise<EventType> => {
    const res = await $getEvent()
    return await res.json();
  }

  const { isPending, isLoading, isError, error, data } = useQuery({
    queryKey: ['fetch-event'],
    queryFn: () => fetchEvent(),
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isPending) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="space-y-2">
      <img src={data?.images[0].url} alt={data?.name} />
      <div className='px-4'>
        <h4 className="text-xl font-bold underline">{data?.name}</h4>
        <h5 className="text-lg font-bold">{data?.dates.start.localDate}</h5>
        <p>{data?.dates.start.localTime}</p>

        <p>{data?.info}</p>

        {data._embedded?.attractions?.map((attraction: Attraction) => (
          <Attraction attractionId={attraction.id} />
        ))}
      </div>
    </div>
  )
}


const Attraction = ({ attractionId }: { attractionId: string }) => {
  const $getAttraction = client.attractions[attractionId].$get 
  const fetchAttraction = async () => {
    const res = await $getAttraction()
    return await res.json();
  }

  const { isPending, isLoading, isError, error, data } = useQuery({
    queryKey: ['fetch-attraction'],
    queryFn: () => fetchAttraction(),
  })

  console.log('data', data);

  return (
    <div>
      Attraction
    </div>
  )
}