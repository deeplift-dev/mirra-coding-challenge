import ky from 'ky'

const api = ky.extend({
    prefixUrl: 'https://app.ticketmaster.com/discovery/v2',
    searchParams: {
        apikey: process.env.TICKETMASTER_API_KEY || '',
        countryCode: 'AU',
    },
})

async function fetchFromAPI(endpoint: string, searchParams: Record<string, any> = {}) {
    try {
        const response = await api.get(`${endpoint}.json`, { searchParams })
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
            throw new Error(`Fetching from ${endpoint} failed: ${error.message}`)
        } else {
            throw new Error(`An unknown error occurred while fetching from ${endpoint}`)
        }
    }
}

export const fetchEvents = async (page: number, attractionId: string) => {
    return fetchFromAPI('events', { page, attractionId })
}

export const fetchEventById = async (id: string) => {
    return fetchFromAPI(`events/${id}`)
}

export const fetchAttractions = async (page: number) => {
    return fetchFromAPI('attractions', { page })
}

export const fetchAttractionById = async (id: string) => {
    return fetchFromAPI(`attractions/${id}`)
}