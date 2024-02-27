import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { z } from 'zod'
import type { Events } from './../../shared/types/ticketmaster.d'
import { fetchEventById, fetchEvents } from './services/ticketMaster'

const app = new Hono()
app.use('/*', cors())
app.use(logger())

app.get('/events',
zValidator(
  'query',
  z.object({
    page: z.string().pipe(z.coerce.number().min(0)).optional()
  })
),
async (c) => {
  const { page } = c.req.valid('query')
  try {
    const response = await fetchEvents(page || 0)


    // There is an issue where the ky library uses response.clone()
    // internally, and bun is currently experiencing a race condition
    // and returning an empty response. Adding another await
    // seems to fix this. PR for fix open here:
    // https://github.com/oven-sh/bun/pull/6468
    const jsonResponse: Events = await response as Events
    
    return c.json({
      ...jsonResponse
    })
  } catch (error) {
    return c.json({ error: error }, 500)
  }
})

app.get('/events/:id', async (c) => {
  const id = c.req.param('id')
  try {
    const response = await fetchEventById(id)
    const jsonResponse = await response
    return c.json({
      ...jsonResponse
    })
  } catch (error) {
    return c.json({ error: error }, 500)
  }
})

export default app
