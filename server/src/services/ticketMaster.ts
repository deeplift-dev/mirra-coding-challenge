import ky from 'ky'

const api = ky.extend({
    prefixUrl: 'https://app.ticketmaster.com/discovery/v2',
    searchParams: {
        apikey: process.env.TICKETMASTER_API_KEY || '',
        countryCode: 'AU', // Hardcoding to AU for now, but this likely would be a query param
    },
})

export const fetchEvents = async (page: number) => {
    try {
        const response = await api.get('events.json', {
            searchParams: { page },
        })
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`)
        }
        const jsonResponse = await response.json()
        if (!jsonResponse || Object.keys(jsonResponse).length === 0) {
            throw new Error('No data returned from the API')
        }
        return jsonResponse
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Fetching events failed: ${error.message}`)
        } else {
            throw new Error('An unknown error occurred while fetching events')
        }
    }
}

export async function fetchEventById(id: string) {
    try {
        const response = await api.get(`events/${id}.json`)
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`)
        }
        const jsonResponse = await response.json()
        if (!jsonResponse || Object.keys(jsonResponse).length === 0) {
            throw new Error('No data returned from the API')
        }
        return jsonResponse
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Fetching event by ID failed: ${error.message}`)
        } else {
            throw new Error('An unknown error occurred while fetching event by ID')
        }
    }
}
