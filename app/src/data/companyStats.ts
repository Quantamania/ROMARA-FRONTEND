/**
 * One source of truth for the numbers ROMARA claims about itself.
 *
 * These used to be typed by hand into each section, and had drifted: the home
 * page counted up to 300 clients and a 5.0 rating, the about page advertised
 * "1000+ Happy Travellers", and the reviews page showed "450+" reviews at 4.9
 * stars. A visitor moving between those pages was told three different stories,
 * and "450+ reviews" from "300 clients" is not even internally possible.
 *
 * The home page numbers won, per the client. Everything imports from here now,
 * so changing a figure changes it everywhere and they cannot drift apart again.
 */
export const companyStats = {
  /** Average review score, out of 5. */
  rating: 5,
  /** People who have travelled with ROMARA. */
  happyClients: 300,
  /** Safaris run to completion. */
  safarisCompleted: 100,
  /** Destinations covered across Kenya and beyond. */
  destinations: 50,
  /** Share of guests who say they would recommend ROMARA. */
  satisfactionPercent: 99,
  /** Years operating. */
  yearsExperience: 10,
} as const

/** "300" -> "300+" for the display style the marketing sections use. */
export function plus(value: number): string {
  return `${value}+`
}
