export type DestinationType = 'wildlife' | 'mountains' | 'beaches' | 'cities' | 'culture' | 'nature'

export interface Destination {
  id: string
  slug: string
  name: string
  image: string
  county: string
  description: string
  bestTimeToVisit: string
  activities: string[]
  durationSuggestion: string
  types: DestinationType[]
}