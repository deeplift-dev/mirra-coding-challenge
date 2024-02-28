import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  Link,
  createFileRoute,
} from '@tanstack/react-router'
import { hc } from 'hono/client'
import { Attraction as AttractionType, Events as EventsType, Event as EventType} from '../../../shared/types/ticketmaster';
import React from 'react';
import { format, parseISO } from 'date-fns';

const client = hc('http://localhost:3000')

export const Route = createFileRoute('/attractions/$attractionId')({
    component: Attraction,
  })


function Attraction() {
  const { attractionId } = Route.useParams();
  const $getAttraction = client.attractions[attractionId].$get

  const fetchAttraction = async (): Promise<AttractionType> => {
    const res = await $getAttraction()
    return await res.json();
  }

  const { isPending, isLoading, isError, error, data } = useQuery({
    queryKey: ['fetch-attraction'],
    queryFn: () => fetchAttraction(),
  })

  console.log(data);

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
    <div className="space-y-2 max-w-screen-md mx-auto">
      <div className='w-full flex flex-col justify-center p-4'>
          <img className='rounded-xl w-full object-cover h-80' src={data?.images[0].url} alt={data?.name} />
          <div className='pt-4'>
            <h4 className="text-xl font-bold underline mb-4">{data?.name}</h4>
            <Events attractionId={attractionId} />
          </div>
        </div>
    </div>
  )
}

const Events = ({attractionId}: {attractionId: string}) => {
  const [page, setPage] = React.useState(0)

  const $get = client.events.$get

  const fetchEvents = async (page: number = 0, attractionId: string): Promise<EventsType> => {
    const res = await $get({
      query: {
        page: page.toString(),
        attractionId: attractionId
      }
    })
    return await res.json();
  }

  const { isPending, isError, error, data } =
  useQuery({
    queryKey: ['', page],
    queryFn: () => fetchEvents(page, attractionId),
    placeholderData: keepPreviousData,
  })

  return (
    <div>
      {isPending ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
        <div>
          <h4 className='font-bold'>Upcoming events</h4>
        </div>
        {
          data?.page.totalElements === 0 && <div className='text-gray-500'>No upcoming events</div>
        }
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mt-4'>
          {data?._embedded?.events?.map((event) => (
            <EventCard event={event} />
          ))}
        </div>
        </div>
      )}
    </div>
  )
}

const EventCard = ({ event }: { event: EventType }) => {
  const formattedDate = format(parseISO(String(event.dates.start.localDate)), "EEEE dd, MMMM yyyy");
  console.log(event)

  return (
    <Link to={event.url} className='border border-gray-200 p-2 rounded-lg shadow hover:shadow-md cursor-pointer'>
      <div>
        <img className='h-40 w-full object-cover rounded-md' src={event.images[0].url} alt={event.name} />
        <p className='font-bold pt-2 border-t border-gray-100'>{event.name}</p>
        <p>{event?._embedded?.venues[0].name}</p>
        <p>{formattedDate}</p>
        <p>{event?.dates.start.localTime}</p>
      </div>
    </Link>
  )
}