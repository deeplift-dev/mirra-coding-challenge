// These types were generated using https://app.quicktype.io/

export interface Events {
    _embedded: EventsEmbedded;
    _links:    EventsLinks;
    page:      Page;
}

export interface EventsEmbedded {
    events: Event[];
}

export interface Event {
    name:            string;
    type:            EventType;
    id:              string;
    test:            boolean;
    url:             string;
    locale:          Locale;
    images:          Image[];
    sales:           Sales;
    dates:           Dates;
    classifications: Classification[];
    promoter?:       Promoter;
    promoters?:      Promoter[];
    info?:           string;
    pleaseNote:      string;
    priceRanges:     PriceRange[];
    products?:       Product[];
    seatmap:         Seatmap;
    accessibility:   Accessibility;
    ticketLimit?:    TicketLimit;
    ageRestrictions: AgeRestrictions;
    ticketing:       Ticketing;
    _links:          EventLinks;
    _embedded:       EventEmbedded;
}

export interface EventEmbedded {
    venues:      Venue[];
    attractions: Attraction[];
}

export interface Attraction {
    name:            string;
    type:            AttractionType;
    id:              string;
    test:            boolean;
    url:             string;
    locale:          Locale;
    externalLinks?:  ExternalLinks;
    aliases?:        string[];
    images:          Image[];
    classifications: Classification[];
    upcomingEvents:  { [key: string]: number };
    _links:          AttractionLinks;
}

export interface AttractionLinks {
    self: First;
}

export interface First {
    href: string;
}

export interface Classification {
    primary:  boolean;
    segment:  Genre;
    genre:    Genre;
    subGenre: Genre;
    type:     Genre;
    subType:  Genre;
    family:   boolean;
}

export interface Genre {
    id:   string;
    name: string;
}

export interface ExternalLinks {
    youtube?:     Facebook[];
    twitter?:     Facebook[];
    itunes?:      Facebook[];
    lastfm?:      Facebook[];
    wiki?:        Facebook[];
    facebook?:    Facebook[];
    spotify?:     Facebook[];
    musicbrainz?: Musicbrainz[];
    instagram?:   Facebook[];
    homepage?:    Facebook[];
}

export interface Facebook {
    url: string;
}

export interface Musicbrainz {
    id: string;
}

export interface Image {
    ratio?:   Ratio;
    url:      string;
    width:    number;
    height:   number;
    fallback: boolean;
}

export enum Ratio {
    The16_9 = "16_9",
    The1_1 = "1_1",
    The3_2 = "3_2",
    The4_3 = "4_3",
}

export enum Locale {
    EnUs = "en-us",
}

export enum AttractionType {
    Attraction = "attraction",
}

export interface Venue {
    name:                     string;
    type:                     VenueType;
    id:                       string;
    test:                     boolean;
    url:                      string;
    locale:                   Locale;
    images?:                  Image[];
    postalCode:               string;
    timezone:                 string;
    city:                     City;
    state:                    State;
    country:                  Country;
    address:                  Address;
    location:                 Location;
    markets:                  Genre[];
    dmas:                     DMA[];
    boxOfficeInfo?:           BoxOfficeInfo;
    parkingDetail?:           string;
    accessibleSeatingDetail?: string;
    generalInfo?:             GeneralInfo;
    upcomingEvents:           UpcomingEvents;
    ada:                      Ada;
    _links:                   AttractionLinks;
    social?:                  Social;
}

export interface Ada {
    adaPhones:     string;
    adaCustomCopy: string;
    adaHours:      string;
}

export interface Address {
    line1:  string;
    line2?: string;
}

export interface BoxOfficeInfo {
    openHoursDetail?:       string;
    acceptedPaymentDetail?: string;
    phoneNumberDetail?:     string;
    willCallDetail?:        string;
}

export interface City {
    name: string;
}

export interface Country {
    name:        Name;
    countryCode: CountryCode;
}

export enum CountryCode {
    Au = "AU",
}

export enum Name {
    Australia = "Australia",
}

export interface DMA {
    id: number;
}

export interface GeneralInfo {
    generalRule?: string;
    childRule?:   string;
}

export interface Location {
    longitude: string;
    latitude:  string;
}

export interface Social {
    twitter: Twitter;
}

export interface Twitter {
    handle: string;
}

export interface State {
    name:      string;
    stateCode: string;
}

export enum VenueType {
    Venue = "venue",
}

export interface UpcomingEvents {
    ticketmaster: number;
    _total:       number;
    _filtered:    number;
    moshtix?:     number;
}

export interface EventLinks {
    self:        First;
    attractions: First[];
    venues:      First[];
}

export interface Accessibility {
    info?:    string;
    url?:     string;
    urlText?: string;
}

export interface AgeRestrictions {
    legalAgeEnforced:    boolean;
    ageRuleDescription?: string;
}

export interface Dates {
    start:            Start;
    timezone:         string;
    status:           Status;
    spanMultipleDays: boolean;
}

export interface Start {
    localDate:      Date;
    localTime:      string;
    dateTime:       Date;
    dateTBD:        boolean;
    dateTBA:        boolean;
    timeTBA:        boolean;
    noSpecificTime: boolean;
}

export interface Status {
    code: Code;
}

export enum Code {
    Offsale = "offsale",
    Onsale = "onsale",
}

export interface PriceRange {
    type:     PriceRangeType;
    currency: Currency;
    min:      number;
    max:      number;
}

export enum Currency {
    Aud = "AUD",
    Usd = "USD",
}

export enum PriceRangeType {
    Standard = "standard",
    StandardIncludingFees = "standard including fees",
}

export interface Product {
    name:            string;
    id:              string;
    url:             string;
    type:            ProductType;
    classifications: Classification[];
}

export enum ProductType {
    Parking = "Parking",
    Upsell = "Upsell",
    Vip = "VIP",
}

export interface Promoter {
    id:          string;
    name:        string;
    description: string;
}

export interface Sales {
    public:    Public;
    presales?: Presale[];
}

export interface Presale {
    startDateTime: Date;
    endDateTime:   Date;
    name:          string;
}

export interface Public {
    startDateTime: Date;
    startTBD:      boolean;
    startTBA:      boolean;
    endDateTime:   Date;
}

export interface Seatmap {
    staticUrl: string;
}

export interface TicketLimit {
    info: string;
}

export interface Ticketing {
    safeTix:             AllInclusivePricing;
    allInclusivePricing: AllInclusivePricing;
}

export interface AllInclusivePricing {
    enabled: boolean;
}

export enum EventType {
    Event = "event",
}

export interface EventsLinks {
    first: First;
    self:  First;
    next:  First;
    last:  First;
}

export interface Page {
    size:          number;
    totalElements: number;
    totalPages:    number;
    number:        number;
}
