import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2 w-full bg-[#024DDF]">
        <Link to="/" className='text-white text-2xl italic font-bold'>
          Ticketfaster
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  ),
})