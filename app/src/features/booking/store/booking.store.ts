import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { submitBookingRequest } from '@/features/booking/api/booking.api'
import type { AdditionalInfo, TripDetails, YourDetails } from '@/features/booking/types/booking.types'

export const TOTAL_STEPS = 4

/**
 * What the visitor clicked "Book now" on. Carried into the booking form so the
 * wizard opens knowing which safari or day trip they picked, instead of asking
 * them to describe it again from scratch.
 */
export interface SelectedPackage {
  kind: 'safari' | 'day-trip'
  slug: string
  name: string
  image: string
  location: string
  priceFromKES: number
  durationDays: number
  /** Free-text duration for day trips, e.g. "4-5 Hours". */
  durationLabel?: string
}

/** durationDays -> the wizard's length-of-stay option. */
function lengthOfStayForDays(days: number): TripDetails['lengthOfStay'] {
  if (days <= 1) return 'day-trip'
  if (days >= 8) return '7plus'
  return (['2d1n', '3d2n', '4d3n', '5d4n', '6d5n', '7d6n'][days - 2] ??
    '3d2n') as TripDetails['lengthOfStay']
}

export const useBookingStore = defineStore('booking', () => {
  const currentStep = ref(1)
  const furthestStepReached = ref(1)
  const selectedPackage = ref<SelectedPackage | null>(null)

  const tripDetails = reactive<TripDetails>({
    service: '',
    travelType: '',
    destination: '',
    travelDate: '',
    adults: 1,
    children: 0,
    lengthOfStay: '',
    specialRequests: '',
  })

  const yourDetails = reactive<YourDetails>({
    fullName: '',
    email: '',
    phone: '',
    country: '',
  })

  const additionalInfo = reactive<AdditionalInfo>({
    preferredAccommodation: '',
    dietaryRequirements: '',
    airportPickupRequired: false,
    celebratingOccasion: '',
    accessibilityRequirements: '',
  })

  /**
   * Fills step 1 from the package the visitor chose. Everything set here stays
   * editable — it is a head start, not a lock-in.
   */
  function prefillFromPackage(pkg: SelectedPackage) {
    selectedPackage.value = pkg
    tripDetails.service = pkg.kind === 'day-trip' ? 'day-trip' : 'wildlife-safari'
    tripDetails.destination = pkg.location
    tripDetails.lengthOfStay = lengthOfStayForDays(pkg.durationDays)
    if (!tripDetails.travelType) tripDetails.travelType = 'private'
  }

  function clearSelectedPackage() {
    selectedPackage.value = null
  }

  const stepErrors = reactive<Record<string, string>>({})
  const isSubmitting = ref(false)
  const isSubmitted = ref(false)
  const agreedToTerms = ref(false)

  function clearErrors() {
    Object.keys(stepErrors).forEach((key) => delete stepErrors[key])
  }

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  function isValidPhone(phone: string) {
    return /^[+\d][\d\s-]{6,}$/.test(phone.trim())
  }

  function validateStep1() {
    clearErrors()
    if (!tripDetails.service) stepErrors.service = 'Please select what you would like to book.'
    if (!tripDetails.travelType) stepErrors.travelType = 'Please select a travel type.'
    if (!tripDetails.destination) stepErrors.destination = 'Please select a destination.'
    if (!tripDetails.travelDate) {
      stepErrors.travelDate = 'Please select your preferred travel date.'
    } else if (new Date(tripDetails.travelDate).getTime() < Date.now() - 86400000) {
      stepErrors.travelDate = 'Travel date must be today or in the future.'
    }
    if (!tripDetails.adults || tripDetails.adults < 1) stepErrors.adults = 'Please select at least 1 adult.'
    if (!tripDetails.lengthOfStay) stepErrors.lengthOfStay = 'Please select the length of stay.'
    return Object.keys(stepErrors).length === 0
  }

  function validateStep2() {
    clearErrors()
    if (!yourDetails.fullName.trim()) stepErrors.fullName = 'Please enter your full name.'
    if (!yourDetails.email.trim()) {
      stepErrors.email = 'Please enter your email address.'
    } else if (!isValidEmail(yourDetails.email)) {
      stepErrors.email = 'Please enter a valid email address.'
    }
    if (!yourDetails.phone.trim()) {
      stepErrors.phone = 'Please enter your phone number.'
    } else if (!isValidPhone(yourDetails.phone)) {
      stepErrors.phone = 'Please enter a valid phone number.'
    }
    return Object.keys(stepErrors).length === 0
  }

  function validateStep4() {
    clearErrors()
    if (!agreedToTerms.value) stepErrors.agreedToTerms = 'Please confirm you agree before submitting.'
    return Object.keys(stepErrors).length === 0
  }

  function validateCurrentStep() {
    if (currentStep.value === 1) return validateStep1()
    if (currentStep.value === 2) return validateStep2()
    // Step 3 (Additional Information) is entirely optional per the brief.
    return true
  }

  function goToNextStep() {
    if (!validateCurrentStep()) return false
    if (currentStep.value < TOTAL_STEPS) {
      currentStep.value += 1
      if (currentStep.value > furthestStepReached.value) furthestStepReached.value = currentStep.value
    }
    return true
  }

  function goToPreviousStep() {
    clearErrors()
    if (currentStep.value > 1) currentStep.value -= 1
  }

  function goToStep(step: number) {
    // Only completed steps are jumpable to, per the brief.
    if (step <= furthestStepReached.value) {
      clearErrors()
      currentStep.value = step
    }
  }

  const isLastStep = computed(function checkIsLastStep() {
    return currentStep.value === TOTAL_STEPS
  })

  // Live indicative price from the visitor's selections (KES). A real quote is
  // confirmed by a consultant, so this is presented as an estimate / "from".
  const estimatedTotal = computed<number | null>(function getEstimatedTotal() {
    const nightsByStay: Record<string, number> = {
      'day-trip': 0, '2d1n': 1, '3d2n': 2, '4d3n': 3, '5d4n': 4, '6d5n': 5, '7d6n': 6, '7plus': 8,
    }
    const rateByService: Record<string, number> = {
      'wildlife-safari': 18000, 'multi-day-tour': 16000, 'mountain-hiking': 14000,
      'beach-holiday': 12000, 'group-tour': 12000, 'corporate-travel': 20000,
      'custom-tour': 18000, 'hotel-booking': 9000, 'day-trip': 8000, 'airport-transfer': 4000,
    }
    const multByType: Record<string, number> = {
      budget: 0.8, 'mid-range': 1, luxury: 1.6, honeymoon: 1.4, private: 1.2,
      family: 1, group: 0.9, solo: 1.1, corporate: 1.3,
    }
    const { service, travelType, lengthOfStay, adults, children } = tripDetails

    // A chosen package has a real published price — use it rather than the
    // generic rate table, so the estimate matches what the site advertises.
    if (selectedPackage.value) {
      const people = adults + children * 0.6
      return Math.max(1000, Math.round((selectedPackage.value.priceFromKES * people) / 100) * 100)
    }

    if (!service || !lengthOfStay || !adults) return null
    const unit = rateByService[service] ?? 15000
    const billableUnits = (nightsByStay[lengthOfStay] ?? 1) || 1 // day trips bill 1 unit
    const people = adults + children * 0.6
    const mult = multByType[travelType] ?? 1
    return Math.max(1000, Math.round((unit * billableUnits * people * mult) / 100) * 100)
  })

  async function submitBooking() {
    if (!validateStep4()) return
    isSubmitting.value = true
    await submitBookingRequest({ tripDetails, yourDetails, additionalInfo })
    isSubmitting.value = false
    isSubmitted.value = true
  }

  function resetBooking() {
    currentStep.value = 1
    furthestStepReached.value = 1
    selectedPackage.value = null
    isSubmitted.value = false
    agreedToTerms.value = false
    clearErrors()
    Object.assign(tripDetails, {
      service: '',
      travelType: '',
      destination: '',
      travelDate: '',
      adults: 1,
      children: 0,
      lengthOfStay: '',
      specialRequests: '',
    })
    Object.assign(yourDetails, { fullName: '', email: '', phone: '', country: '' })
    Object.assign(additionalInfo, {
      preferredAccommodation: '',
      dietaryRequirements: '',
      airportPickupRequired: false,
      celebratingOccasion: '',
      accessibilityRequirements: '',
    })
  }

  return {
    currentStep,
    furthestStepReached,
    selectedPackage,
    prefillFromPackage,
    clearSelectedPackage,
    tripDetails,
    yourDetails,
    additionalInfo,
    stepErrors,
    isSubmitting,
    isSubmitted,
    agreedToTerms,
    isLastStep,
    estimatedTotal,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    submitBooking,
    resetBooking,
  }
})