// Canonical ROMARA vehicle fleet — shared by the landing FleetShowcase and the
// Vehicle Hire page so the graphics, names, capacities and daily rates never drift.
// Body uses currentColor (romara-green from the container); wheels/accents use brand amber.

export type FleetKey = 'cruiser' | 'van' | 'executive' | 'saloon'

export interface FleetVehicle {
  key: FleetKey
  name: string
  capacity: string
  /** Passenger seats, for party-size hints. */
  seats: number
  desc: string
  /** Indicative self-drive day rate in KES. Chauffeur adds a flat per-day fee. */
  dailyRate: number
  /** Photo of the vehicle. Falls back to the SVG if the file is missing. */
  image: string
  svg: string
}

const cruiser = `<svg viewBox="0 0 200 120" class="h-full w-full" aria-hidden="true">
  <rect x="46" y="30" width="98" height="5" rx="2.5" fill="currentColor"/>
  <rect x="50" y="26" width="4" height="6" rx="1" fill="currentColor"/>
  <rect x="136" y="26" width="4" height="6" rx="1" fill="currentColor"/>
  <rect x="52" y="34" width="92" height="24" fill="currentColor"/>
  <rect x="24" y="56" width="154" height="34" rx="6" fill="currentColor"/>
  <rect x="60" y="42" width="30" height="14" rx="2" fill="#F7F5F1" opacity="0.92"/>
  <rect x="94" y="42" width="30" height="14" rx="2" fill="#F7F5F1" opacity="0.92"/>
  <rect x="128" y="43" width="12" height="13" rx="2" fill="#F7F5F1" opacity="0.92"/>
  <circle cx="60" cy="92" r="17" fill="#0B1D12"/><circle cx="60" cy="92" r="6" fill="#C8863A"/>
  <circle cx="150" cy="92" r="17" fill="#0B1D12"/><circle cx="150" cy="92" r="6" fill="#C8863A"/>
</svg>`

const van = `<svg viewBox="0 0 200 120" class="h-full w-full" aria-hidden="true">
  <polygon points="98,32 158,32 162,50 98,50" fill="currentColor"/>
  <rect x="100" y="37" width="56" height="9" rx="2" fill="#F7F5F1" opacity="0.85"/>
  <path d="M22 90 V56 L40 46 H172 a6 6 0 0 1 6 6 V90 Z" fill="currentColor"/>
  <rect x="44" y="52" width="22" height="14" rx="2" fill="#F7F5F1" opacity="0.92"/>
  <rect x="70" y="52" width="24" height="14" rx="2" fill="#F7F5F1" opacity="0.92"/>
  <circle cx="60" cy="92" r="17" fill="#0B1D12"/><circle cx="60" cy="92" r="6" fill="#C8863A"/>
  <circle cx="150" cy="92" r="17" fill="#0B1D12"/><circle cx="150" cy="92" r="6" fill="#C8863A"/>
</svg>`

const executive = `<svg viewBox="0 0 200 120" class="h-full w-full" aria-hidden="true">
  <path d="M18 90 V54 L44 42 H172 a6 6 0 0 1 6 6 V90 Z" fill="currentColor"/>
  <polygon points="46,46 62,46 62,60 40,60" fill="#F7F5F1" opacity="0.9"/>
  <rect x="66" y="48" width="102" height="12" rx="2" fill="#0B1D12" opacity="0.45"/>
  <rect x="18" y="76" width="160" height="3" fill="#C8863A" opacity="0.85"/>
  <circle cx="58" cy="92" r="17" fill="#0B1D12"/><circle cx="58" cy="92" r="6" fill="#C8863A"/>
  <circle cx="152" cy="92" r="17" fill="#0B1D12"/><circle cx="152" cy="92" r="6" fill="#C8863A"/>
</svg>`

const saloon = `<svg viewBox="0 0 200 120" class="h-full w-full" aria-hidden="true">
  <polygon points="66,46 120,46 140,64 52,64" fill="currentColor"/>
  <rect x="22" y="62" width="156" height="28" rx="12" fill="currentColor"/>
  <polygon points="70,50 92,50 92,62 58,62" fill="#F7F5F1" opacity="0.92"/>
  <polygon points="98,50 116,50 132,62 98,62" fill="#F7F5F1" opacity="0.92"/>
  <circle cx="58" cy="90" r="16" fill="#0B1D12"/><circle cx="58" cy="90" r="6" fill="#C8863A"/>
  <circle cx="150" cy="90" r="16" fill="#0B1D12"/><circle cx="150" cy="90" r="6" fill="#C8863A"/>
</svg>`

export const fleet: FleetVehicle[] = [
  { key: 'cruiser', name: 'Safari Land Cruiser', capacity: '5–7 guests', seats: 7, desc: 'Rugged 4x4 with a pop-up roof hatch — the classic game-drive vehicle.', dailyRate: 15000, image: '/images/fleet/cruiser.webp', svg: cruiser },
  { key: 'van', name: 'Safari Van', capacity: '7–9 guests', seats: 9, desc: 'Pop-top minivan, great value for family and small-group safaris.', dailyRate: 10000, image: '/images/fleet/van.webp', svg: van },
  { key: 'executive', name: 'Executive Van', capacity: '8–12 guests', seats: 12, desc: 'Sleek, comfortable transfers for corporate travel and larger groups.', dailyRate: 12000, image: '/images/fleet/executive.webp', svg: executive },
  { key: 'saloon', name: 'Saloon Car', capacity: '2–3 guests', seats: 3, desc: 'Comfortable city rides and airport transfers around town.', dailyRate: 6000, image: '/images/fleet/saloon.webp', svg: saloon },
]

export const fleetByKey: Record<FleetKey, FleetVehicle> = Object.fromEntries(
  fleet.map((v) => [v.key, v]),
) as Record<FleetKey, FleetVehicle>

/** Flat per-day surcharge when a professional driver is included. */
export const CHAUFFEUR_PER_DAY = 3500
