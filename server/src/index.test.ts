import { describe, expect, it } from 'bun:test'
import app from '.'

type ValidationError = {
    code: string;
    minimum?: number;
    type?: string;
    inclusive?: boolean;
    exact?: boolean;
    message: string;
    expected?: string;
    received?: string;
    path: string[];
  };
  
  type ErrorResponse = {
    issues: ValidationError[];
    name: string;
  };

const baseUri = 'https://localhost:3000'

describe('Test ticket master service', () => {
    it('Should successfully retrieve first page of events', async () => {
        const res = await app.request(`${baseUri}/events?page=0&attractionId=G5vZ9171o7f`)
        expect(res.status).toBe(200)
    })

    it('Events should be returned with pagination', async () => {
        const res = await app.request(`${baseUri}/events?page=0&attractionId=G5vZ9171o7f`)
        const events = await res.json()
        expect(events).toHaveProperty('page')
        expect(events).toHaveProperty('_links')
        expect(events.page.size).toBeGreaterThan(0)
    })

    it('Should return an error for invalid page parameter', async () => {
        const res = await app.request(`${baseUri}/events?page=-1&attractionId=G5vZ9171o7f`)
        expect(res.status).toBe(400)
        const body = await res.json()
        const errorBody: ErrorResponse = body.error
        expect(errorBody.name).toBe('ZodError')
        expect(errorBody.issues).toHaveLength(1)
        
        const expectedIssue = {
            code: 'too_small',
            minimum: 0,
            type: 'number',
            inclusive: true,
            exact: false,
            message: 'Number must be greater than or equal to 0',
            path: ['page']
        }
        expect(errorBody.issues[0]).toEqual(expectedIssue)
    })

    it('Should return an error for empty attractionId parameter', async () => {
        const res = await app.request(`${baseUri}/events?page=0`)
        expect(res.status).toBe(400)
        const body = await res.json()
        const errorBody: ErrorResponse = body.error
        expect(errorBody.name).toBe('ZodError')
        expect(errorBody.issues).toHaveLength(1)
        
        const expectedIssue = {
            code: 'invalid_type',
            expected: 'string',
            received: 'undefined',
            message: 'Required',
            path: ['attractionId']
        }
        expect(errorBody.issues[0]).toEqual(expectedIssue)
    })

    it('should return an event by id', async () => {
        const res = await app.request(`${baseUri}/events/G5efZ90OS9Jnr`)
        expect(res.status).toBe(200)
        const event = await res.json()
        expect(event).toHaveProperty('id')
        expect(event).toHaveProperty('name')
    })

    it('should return an attraction by id', async () => {
        const res = await app.request(`${baseUri}/attractions/K8vZ9171o7f`)
        expect(res.status).toBe(200)
        const attraction = await res.json()
        expect(attraction).toHaveProperty('id')
        expect(attraction).toHaveProperty('name')
    })
})