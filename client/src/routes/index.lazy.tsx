import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Link, createLazyFileRoute } from '@tanstack/react-router';
import {Welcome, Event} from '../../../shared/types/ticketmaster'
import { hc } from 'hono/client'
import React from 'react';

export const Route = createLazyFileRoute('/')({
  component: Index,
})

const client = hc('http://localhost:3000')


function Index() {
  return (
    <div className='p-4'>
      <EventsGrid />
    </div>
  )
}

const EventsGrid = () => {
  const [page, setPage] = React.useState(0)

  const $get = client.events.$get

  const fetchEvents = async (page: number = 0): Promise<Welcome> => {
    const res = await $get({
      query: {
        page: page.toString()
      }
    })
    return await res.json();
  }


  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ['', page],
      queryFn: () => fetchEvents(page),
      placeholderData: keepPreviousData,
    })

  return (
    <div>
      {isPending ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2'>
          {data?._embedded?.events?.map((event) => (
            <EventCard event={event} />
          ))}
        </div>
      )}
      <PaginationButtons page={page} setPage={setPage} isPlaceholderData={isPlaceholderData} data={data} />
      {isFetching ? <span> Loading...</span> : null}{' '}
    </div>
  )
}

const EventCard = ({ event }: { event: Event }) => {
  return (
    <Link to={`/events/${event.id}`} className='cursor-pointer bg-white p-2 shadow border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300' key={event.id}>
      <img src={event.images[0].url} alt={event.name} className='w-full h-40 object-cover rounded-lg' />
      <p className='font-medium py-2'>{event.name}</p>
    </Link>
  )
}

const PaginationButtons = ({ page, setPage, isPlaceholderData, data }: {
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  isPlaceholderData: boolean,
  data: Welcome | undefined
}) => {
  return (
    <div className='inline-flex space-x-4 my-4 items-center'>
      <button
        className="px-2 py-1 bg-blue-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>{' '}
      <div className='text-gray-600'>Current Page: {page + 1}</div>
      <button
            className="px-2 py-1 bg-blue-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => {
          if (!isPlaceholderData && data?._links?.next) {
            setPage((old) => old + 1)
          }
        }}
        // Disable the Next Page button until we know a next page is available
        disabled={isPlaceholderData || !data?._links?.next}
      >
        Next Page
      </button> 
    </div>
  )
}