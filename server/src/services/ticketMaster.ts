import ky from 'ky'

const api = ky.extend({
    prefixUrl: 'https://app.ticketmaster.com/discovery/v2',
    searchParams: {
        apikey: process.env.TICKETMASTER_API_KEY || '',
        countryCode: 'AU', // Hardcoding to AU for now, but this likely would be a query param
    },
})

export const fetchEvents = async (page: number) => {
    const response = await api.get('events.json', {
        searchParams: { page },
    })

    return response.json()
}